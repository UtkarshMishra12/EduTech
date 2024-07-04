const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();

exports.createCourse = async (req,res) =>{
    try{
        //Get user ID from request object
        const userId= req.user.id;

        //fetch data
        let {
            courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			status,
			instructions,
        } = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag ||
			!thumbnail ||
			!category){
            return res.status(400).json({
                success:false,
                message: "All fields are required",
            })
        }

        if (!status || status === undefined) {
			status = "Draft";
		}

        const instructorDetails = await User.findById(userId,
            {
                accountType: "Instructor",
            }
        );

        console.log("Instructor details:",instructorDetails);
        //Verify that userId and instructorDetails._id are same or different (TODO)

        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message: "Instructor details not found",
            })
        }

        //check given tag is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails ){
            return res.status(400).json({
                success:false,
                message: "Tag details not found",
            })
        }

        //Upload Image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        console.log(thumbnailImage);

        //create an entry for new course
        const newCourse = new Course.create({
            courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag: tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
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
        await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);


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
        const allCourses = await Course.find(
			{},
			{
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			}
		)
            .populate("instructor")
            .execute();
        
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