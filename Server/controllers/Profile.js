const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req,res) =>{
    try{
        //get data
        const {dateOfBirth="",about="", contactNumber, gender } = req.body;
        //get userId
        const id = req.user.id;
        //validation
        if(!contactNumber || !gender || !Id){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        };
        //find profile
        const userDetails = await User.findById(id);
        const profileId= userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.contactNumber = contactNumber;
        profileDetails.about= about;
        profileDetails.gender= gender;

        await profileDetails.save();
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
        const userDetails = await User.findById(id);

        if(!userDetails){
            return res.status(500).json({
                success:false,
                message:"User does not exist",
            })
        };

        const profileId = userDetails.additionalDetails;
        //delete profile
        await Profile.findByIdAndDelete(profileId); // (_id:userDetails.additionalDetails)
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
