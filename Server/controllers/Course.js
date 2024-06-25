const Course = require("../models/Course");
const Tag = require("../models/Tag");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();

exports.createCourse = async (req,res) =>{
    try{
        //fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag){
            return res.status(400).json({
                success:false,
                message: "All fields are required",
            })
        }

        //check for instructor
        const userId= req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor details:",instructorDetails);

        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message: "Instructor details not found",
            })
        }

        //check given tag is valid or not
        const tagDetails = await Tag.findById(tag);
        if(!tagDetails){
            return res.status(400).json({
                success:false,
                message: "Tag details not found",
            })
        }

        //Upload Image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create an entry for new course
        const newCourse = new Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn : whatYouWillLearn,
            price,
            tag: tagDetails._id, 
            thumbnail: thumbnailImage.secure_url,
        })

        //add the ne course to the user schema of the instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses: newCourse._id,
                }
            },
            {new:true},
        );

        //update the tag schema
        


        //return response
        return res.status(200).json({
            success:true,
            message: "Course created successfully",
            data: newCourse,
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message: "All fields are required",
        })
    }
}

exports.showAllCourses = async (req,res) =>{
    try{
        const allCourses = await Course.find({});
        // {courseName:true,
        //     price:true,
        //     thumbnail:true,
        //     instructor:true,
        //     ratingAndReviews:true,
        //     studentsEnrolled:true,})
        //     .populate("instructor")
        //     .execute();
        
        return res.status(200).json({
            success:true,
            message:"All courses fetched successfully",
            data: allCourses,
        })                                         
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: "Cannot fetch the course data",
            error: error.message,
        })
    }
}