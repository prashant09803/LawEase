const User = require("../models/User");
const Profile = require("../models/Profile");
const { uploadToCloudinary } = require("../utils/uploadToCloudinary");
require("dotenv").config();


//profile set of advocate
exports.setProfile = async(req,res) => {
    try {
      //get user id
      const userId = req.user.id
  
      //profile pic
      const profilePic = req.files.image;
  
      //get details from req.body
      const {
        gender, 
        about, 
        contactNumber,
        experience,
        age,
        district,
        taluka,
        state,
        university,
        category,
        enrollmentNumber
      } = req.body
  
      //validate required fields
      if(
        !profilePic||
        !gender ||
        !enrollmentNumber ||
        !about ||
        !contactNumber ||
        !experience ||
        !age ||
        !district ||
        !taluka ||
        !university ||
        !category) {
          return res.status(400).json({
            success: false,
            message: "All fields are required",
          });
        }
      
      //TODO:verify provider from barcouncil database
      
  
  
      //upload to cloudinary
      const response = await uploadToCloudinary(profilePic, process.env.FOLDER_NAME, 500)
  
      //change profile pic
      await User.findByIdAndUpdate(userId, {
        image: response.secure_url,
      })
  
      //get profile of that user
      const user = await User.findById(userId).populate("additionalDetails")
      const userProfileId = user.additionalDetails._id;
  
      console.log("userProfileId" , userProfileId);
  
      //update profile
      const updatedProfile = await Profile.findByIdAndUpdate(
        userProfileId,
        {
          gender, 
          about, 
          contactNumber,
          experience,
          age,
          district,
          taluka,
          state,
          university,
          category,
          enrollmentNumber
        },
        {
          new: true,
        }
      );
  
      //return response
      return res.status(200).json({
        success: true,
        message: "Profile set successfully",
        data: updatedProfile,
      })
    }
    catch(error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while setting profile",
      });
    }
  }
  
//TODO:verify lawyer
  