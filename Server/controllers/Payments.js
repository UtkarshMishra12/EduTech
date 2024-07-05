const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");

//capture the payment initiate the razorpay order
exports.capturePayment = async (req,res) =>{
    try{
        //get courseId and UserId
        const {course_Id} = req.body;
        const userId = req.user.id;
        //validation
        //valid courseID
        if(!course_Id){
            return res.status(403).json({
                success:false,
                message: "Please provide valid course Id"
            });
        }
        //VALID courseDetails
        let course;
        try{
            course = await Course.findById(course_Id);
            if(!course){
                return res.status(403).json({
                    success:false,
                    message: "Could not find the course"
                });
            }

            //user already pay for the same course
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(403).json({
                    success:false,
                    message: "Student already enrolled in the course"
                });
            }
        }
        catch(error){
            console.log(error);
            return res.status(403).json({
                success:false,
                message: "Error in fetching the course details"
            });
        }
        //order create
        const amount = course.price;
        const currency = "INR";

        const options = {
            amount: amount*100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId:course_Id,
                userId,
            }
        }

        try{
            //initiate the payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);

            //return response
            return res.status(200).json({
                success:true,
                message: "Details of Payment",
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
            });
        }
        catch(error){
            return res.status(403).json({
                success:false,
                message: "Could not initiate payment"
            });
        }

    
    }
    catch(error){
        console.log(error);
        return res.status(403).json({
            success:false,
        });
    }
}

