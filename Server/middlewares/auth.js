const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req,res,next) =>{
    try{
        //fetch token
        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer", "");

        if(!token || token === undefined){
            console.log(error);
            return res.status(500).json({
            success:false,
            message:'Token Missing',
            });
        }
        
        //verify the token
        try{
            const decode= jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Token is Invalid",
            });
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:'Error in fetching the token',
        });
    }
}

//isStudent
exports.isStudent = async (req,res,next) =>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for student",
            })
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'User role unidentified',
        });
    }
}


//isInstructor
exports.isInstructor = async (req,res,next) =>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructor",
            })
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'User role unidentified',
        });
    }
}


//isAdmin
exports.isAdmin = async (req,res,next) =>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for admin",
            })
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'User role unidentified',
        });
    }
}