const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

exports.createSubSection = async (req,res) =>{
    try{
        //fetch data
        const {title, timeDuration, description, sectionId} = req.body;
        //extract files
        const video = req.files.videoFile;
        //validation
        if(!title || !timeDuration || !description || !sectionId || !video){
            return res.status(400).json({
                success:false,
                message: "All fields are required",
            })
        }
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        //create subsection
        const subSectionDeatils = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl: uploadDetails.secure_url,
        })
        //add subsection id to section
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId}, 
            {
                $push:{
                    subSection: subSectionDeatils._id,
                }
            },
            {new:true},
        )
        //Lof updated section here after addinf populate uery
        //return response
        return res.status(200).json({
            success:true,
            updatedSection,
            message:"SubSection Created successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in creating SubSection",
        })
    }
}

