const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.updateProfile = async (req,res) =>{
    try{
        //get data
        const {dateOfBirth="",about="", contactNumber, gender } = req.body;
        //get userId
        const id = req.user.id;
        //validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        };
        //find profile
        const userDetails = await User.findById(id);
		const profile = await Profile.findById(userDetails.additionalDetails);
        //update profile
        profile.dateOfBirth = dateOfBirth;
        profile.contactNumber = contactNumber;
        profile.about= about;

        await profile.save();
        //return reponse
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
        });
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error in updating Profile",
        })
    }
};

//delete account
exports.deleteAccount = async (req,res) =>{
    try{
        //get id
        const id = req.user.id;
        //validate id
        const user = await User.findById({_id:id});

        if(!user){
            return res.status(500).json({
                success:false,
                message:"User does not exist",
            })
        };

        // const profileId = userDetails.additionalDetails;
        //delete profile
        await Profile.findByIdAndDelete({_id:user.userDetails}); // (_id:userDetails.additionalDetails)
        //TODO : UnEnroll user from all the enrolled courses
        //delete user
        await User.findByIdAndDelete({_id:id});
        //return response
        return res.status(200).json({
            success:true,
            message: "User Deleted successfully",
        });
        //TODO: Schedule deletion of account
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error in deleting Profile",
        })
    }
}

exports.getAllUserDetails = async (req,res) =>{
    try{
        //get id
        const id = req.user.id;

        //validation and user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        
        //return response
        return res.status(200).json({
            success:true,
            message: "User Details fetched successfully",
            data: userDetails,
        })


    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error in getting all userDetails",
        })
    }
}
