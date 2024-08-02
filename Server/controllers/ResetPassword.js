const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//ResetPasswordToken
exports.resetPasswordToken =  async (req,res) =>{
   try{
     //get email from the body
     const email = req.body.email;

     //check is user exist with fiven email
     const user =  await User.findOne({email});
 
     if(!user){
         return res.status(401).json({
             success:false,
             message:"Your email is not registered",
         })
     };
 
     //generate token
     const token  = crypto.randomBytes(20).toString("hex");
 
     //update user by adding expiration time
     const updatedDetails = await User.findOneAndUpdate(
       { email: email },
       {
         token: token,
         resetPasswordExpires: Date.now() + 3600000,
       },
       { new: true }
     );

     console.log("DETAILS", updatedDetails);
     
     //create url
     const url = `http://localhost:3000/update-password/${token}`;
 
     //send mail
     await mailSender(
       email,
       "Password reset Link",
       `Your Link for email verification is ${url}. Please click this url to reset your password.`
     );
     //send response
     return res.status(200).json({
         success:true,
         message: "Please check your email and reset your password"
     })

   }
   catch(error){
    console.log(error.message);
    res.status(500).json({
        success:false,
        message: "Error in generating the resetPassword token",
    });
   }
    
}


//ResetPassword // We will get the token, password, confirmPass
exports.resetPassword = async (req,res) => {
    try{
        //fetch data
        const {token, password, confirmPassword} = req.body;
        //validation
        if(password !== confirmPassword){
            res.status(401).json({
                success:false,
                message: "Password does not match "
            })
        }
        
        //get userDetails from db using token
        const userDetails = await User.findOne({token:token});

        //if no entry - invalid token
        if(!userDetails){
            return res.status(401).json({
                success:false,
                message: "Token Invalid",
            })
        }
        //token time check
        if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}

        //hash password
        const hashedPassword= await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(
            {token:token},
            {password: hashedPassword},
            {new:true},
        );

        return res.status(200).json({
            success:true,
            message: "Password reset successfully",
        })

    }
    catch(error){
        console.log(error.message);
        res.status(500).json({
        success:false,
        message: "Error in resetting the Password",
    })
    }
}
