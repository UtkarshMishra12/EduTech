const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    completedVideo :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection",
    }
});

module.exports = mongoose.model("CourseProgress", progressSchema);