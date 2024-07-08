const express = require("express");
const app = express();

// require("dotenv").config();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

//database
const dbConnect = require("./config/database");
dbConnect();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials:true,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

//cloudinary connection
cloudinaryConnect();

app.use("api/v1/auth", userRoutes);
app.use("api/v1/profile", profileRoutes);
app.use("api/v1/course", courseRoutes);
app.use("api/v1/payment", paymentRoutes);


app.get("/", (res,req) =>{
    return res.statusCode(200).json({
        success:true,
        message:"Your server is up and running.....",
    });
})

app.listen(PORT, ()=>{
    console.log("Server started successfully");
})

