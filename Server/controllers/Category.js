const mongoose = require("mongoose");
const Category = require("../models/Category");

exports.createCategory = async (req,res) =>{
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
        const categoryDetails = await Category.create({
            name:name,
            description:description,
        });
        console.log(categoryDetails);

        return res.status(200).json({
            success:true,
            tagDetails,
            message:"Category created successfully",
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Error in creating Category",
        });
    }
}


exports.showAllCategories = async (req,res) =>{
    try{
        const allCategorys = await Category.find({}, {name:true, description:true});

        res.status(200).json({
            success:true,
            allCategorys,
            message: "Categories fetched successfully",
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Error in fetching Category",
        });
    }
}
