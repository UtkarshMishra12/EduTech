const User = require("../models/User");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailSender = require("../utils/mailSender");
const {passwordUpdated} = require("../mail/templates/passwordUpdate");
const Profile = require("../models/Profile");


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

        //check unique otp or not
        const result = await OTP.findOne({otp:otp});

        console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);

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
        const otpBody = await OTP.create(otpPayload); //when this will be executed, first a mail will be send to the user as we have written in the OTP Model
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
            otp,
        }= req.body;

        //validation 
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).send({
                success:false,
                message: "Please fill the form correctly",
            });
        }

        //check if both the password are same or not
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message: "Password does not match, please write correctly",
            });
        }

        //check if user already present
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                 success:false,
                 message:"User already exist",
            });
        }

        //find most recent OTP stored for the user
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		console.log(response);

        //validateOTP
        if(response.length === 0){
            return res.status(400).json({
                success:false,
                message:"OTP Not found",
            });
        }
        else if(otp !== response[0].otp){
            //Invalid OTP
            return res.status(400).json({
                success:false,
                message:"Invalid OTP",
            })
        }


        //Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);
        console.log(approved);

        // Create the Additional Profile For User
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });
        console.log(profileDetails);

        //create entry in DB
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
        });

        return res.status(200).json({
            success:true,
            message: "User registered successfully",
            user,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered. Please try Again",
        });
    }
};


//Login
exports.login = async (req,res) => {
    try{
        //fetch data
        const {email,password} = req.body;

        //validation
        if(!email || !password){
            res.status(403).json({
                success:false,
                message: "Please fill the email and password correctly",
            });
        }

        //check for existing user
        const user = await User.findOne({email}).populate("additionalDetails");

        if(!user){
            res.status(401).json({
                success:false,
                message:"User is not Registered with Us Please SignUp to Continue",
            })
        }

        const payload = {
            email:user.email,
            id:user._id,
            accountType:user.accountType, //role:user.role;
        }
        //match the password
        if( await bcrypt.compare(password, user.password)){
            
            //generate jwt token after password matching
            const token = jwt.sign(payload, 
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
            );

            //user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expiresIn: new Date( Date.now() + 3* 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            //create cookie and send response
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in Successfully",
            })
        }
        else{
            //password does not match
            return res.status(401).json({
                success:false,
                message:"Password does not match",
            });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure, please try again',
        });
    }
}


// Controller for Changing Password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};