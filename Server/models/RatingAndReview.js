const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model("RatingAndRevie", ratingSchema);