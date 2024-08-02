const Section = require("../models/Section");
const Course = require("../models/Course");


exports.createSection = async (req,res) =>{
    try{
        //data fetch
        const {sectionName, courseId} = req.body;

        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message: "Missing properties"
            });
        }

        //create section
        const newSection = await Section.create({
            sectionName
        });

        //update course with section ObjectId
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent: newSection._id,
                }
            },
            {new:true}
        )
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();
        
        //return res
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in creating Section",
            error: error.message,
        })
    }
}

exports.updateSection = async (res,req) =>{
    try{
        //data input
        const {sectionName, sectionId} = req.body;

        //data validation
        if(!sectionName || !sectionId){
            return res.status(500).json({
                success:false,
                message: "Missing properties"
            });
        }

        //update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});

        //return res
        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            section,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in updating Section",
            error: error.message,
        })
    }
};

exports.deleteSection = async (req,res) =>{
    try{
        //get ID - assuming we are sending the section id in params
        //ToDo-> req.params -? Test
        const {sectionId} = req.params;
        //Find by id and delete
        await Section.findByIdAndDelete(sectionId);
        //TODO-  Check do we need to delete the entry from the course sechema [TESTING]
        //send response
        res.status(200).json({
            success:true,
            message: "Section Deleted",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in Deleting Section",
            error: error.message,
        })
    }
}