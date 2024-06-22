const User = require("../models/User");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");


//SendOTP
exports.sendOTP = async (req,res) =>{
    try{
        //fetch email from the body
        const {email} = req.body;

        //check if user already exist
        const checkUserPresent = await User.findOne({email});

       //if user already exist
       if(checkUserPresent){
            res.status(401).json({
              success:false,
              message: "User Already Exist",
            })
        }

        //generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP Generted", otp);

        //check unique otp or not
        let result = await User.findOne({otp:otp});

        while(result){
            otp=  otpGenerator(6,{
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await User.findOne({otp:otp});
        }

        const otpPayload = {email,otp};

        //create an entry in  DB
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);
        
        //return response
        res.status(200).json({
            success:true,
            message:"OTP Sent successfully",
        }) 


    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Error in sending OTP || Fetching the email",
        })
    }
}


//Signup
exports.signUp = async (req,res) =>{
    try{
        //fetch data
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        }= req.body;

        //validation 
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            res.status(403).json({
                success:false,
                message: "Please fill the form correctly",
            })
        }

        //check if both the password are same or not
        if(password !== confirmPassword){
            res.status(500).json({
                success:true,
                message: "Password does not match, please write correctly",
            })
        }

        //check if user already present
        const existingUser= await User.findOne({email});
        if(existingUser){
             res.status(400).json({
                 success:false,
                 message:"User already exist",
            })
        }

        //find most recent OTP stored for the user
        const recentOtp = await User.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);

        //validateOTP
        if(recentOtp.length == 0){
            res.status(400).json({
                success:false,
                message:"OTP Not found",
            })
        }
        else if(otp !== recentOtp.otp){
            //Invalid OTP
            res.status(400).json({
                success:false,
                message:"Invalid OTP",
            })
        }


        //Hash Password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(error){
            res.status(404).json({
                success:false,
                message: "Error in hashing the password",
            })
        }

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })

        //create entry in DB
        const data = await User.create({
            firstName,
            lastName,
            password:hashedPassword,
            email,
            accountType,
            contactNumber,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        res.status(200).json({
            success:true,
            message: "User registered successfully",
            user,
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Error in signingUp",
        })
    }
}


//Login


//Change password