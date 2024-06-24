const mongoose = require("mongoose");
const Tag = require("../models/Tag");

exports.createTag = async (req,res) =>{
    try{
        //fetch data
        const {name, description} = req.body;

        //validation
        if(!name || !description){
            res.status(400).json({
                success: false,
                message:" Please fill the Name and Description correctly",
            })
        }

        //create entry in DB
        const tagDetails = await Tag.create({
            name:name,
            description:description,
        });
        console.log(tagDetails);

        res.status(200).json({
            success:true,
            tagDetails,
            message:"Tag created successfully",
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Error in creating Tag",
        });
    }
}
