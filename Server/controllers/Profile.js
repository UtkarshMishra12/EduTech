const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// exports.updateProfile = async (req,res) =>{
//     try{
//         //get data
//         const {dateOfBirth="",about="", contactNumber} = req.body;
//         //get userId
//         const id = req.user.id;
//         //validation
//         if(!contactNumber || !id){
//             return res.status(400).json({
//                 success:false,
//                 message:"All fields are required",
//             })
//         };
//         //find profile
//         const userDetails = await User.findById(id);
// 		const profile = await Profile.findById(userDetails.additionalDetails);
//         //update profile
//         profile.dateOfBirth = dateOfBirth;
//         profile.contactNumber = contactNumber;
//         profile.about= about;
//         // profile.gender= gender;

//         await profile.save();
//         //return reponse
//         return res.status(200).json({
//             success:true,
//             message:"Profile updated successfully",
//             profile,
//         });
//     }
//     catch(error){
//         return res.status(400).json({
//             success:false,
//             message:"Error in updating Profile",
//         })
//     }
// };

//delete account

exports.updateProfile = async (req, res) => {
	try {
		const { dateOfBirth , about, contactNumber } = req.body;
		const id = req.user.id;

		console.log("dob--" , dateOfBirth , about, contactNumber );
		console.log("req.body", req.body);

		const {firstName, lastName} = req.body;

		// Find the profile by id
		// const userDetails = await User.findById(id);
		// const profile = await Profile.findById(userDetails.additionalDetails);



		// // Update the profile fields
		// profile.dateOfBirth = dateOfBirth;
		// profile.about = about;
		// profile.contactNumber = contactNumber;

		// // Save the updated profile
		// await profile.save();

		const profile = await User.findByIdAndUpdate(
			{_id: id} ,
			{firstName, lastName},
			{new: true}
		).populate("additionalDetails").lean();

		const additionalDetails = await Profile.findByIdAndUpdate(
			{_id : profile.additionalDetails._id},
			{ dateOfBirth , about, contactNumber },
			{new: true}
		);

		const updatedUserDetails = await User.findOne(
			{_id : id}
		).populate("additionalDetails").lean();

		return res.json({
			success: true,
			message: "Profile updated successfully",
			profile,
			updatedUserDetails,
			additionalDetails,
		});



	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};


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
        await Profile.findByIdAndDelete({_id:user.additionalDetails}); // (_id:userDetails.additionalDetails)
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

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};