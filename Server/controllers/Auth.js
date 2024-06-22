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



//Login


//Change password