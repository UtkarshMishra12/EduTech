const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");


//createRating
exports.createRating = async (req,res) =>{
    try{
        //get user id
        const userId = req.user.id;
        //fetch data from req body
        const {rating, review, courseId} = req.body;
        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
            {_id:courseId,
            studentsEnrolled: {$elemMatch : {$eq : userId} },
            }
        );
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course",
            })
        }
        //check if user already reviewd or not
        const alreadyReviewd = await RatingAndReview.findOne({
            user:userId,
            course:courseId,
        });
        if(alreadyReviewd){
            return res.status(403).json({
                success:false,
                message:"Course is already reviews by the user",
            });
        }
        //create rating and review
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            user:userId,
            course:courseId,
        });
        //update the course with this review
        const updatedCourseDetails = await Course.findByIdAndUpdate( {_id:courseId},
            {
                $push:{
                    ratingAndReviews:ratingReview._id,
                }
            },
            {new:true}
        );
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Reviews created successfully",
            ratingReview,
        })

    }
    catch(error){
        console.log(error);
        return res.status(403).json({
            success:false,
            message:"Error in creating Rating and Reviews",
        });
    }
}


//getAverageRating


//getAllRating