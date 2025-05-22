import React from "react";
import { useForm } from "react-hook-form";

function CourseBuilderForm() {
    const {register, handleSubmit, setValue, formState: { errors }} = useForm();
    return(
        <div className="text-white">
            <p>Course Builder</p>
            <form action="">
                <div>
                    <label>Section Name<sup>*</sup></label>
                    <input 
                        id="sectionName"
                        placeholder="Section Name"
                        {...register("sectionName", { required: true })}   
                        className="w-full" 
                    />
                    {
                        errors.sectionName && (
                            <span>{errors.sectionName.message}</span>
                        )
                    }
                </div>
                
            </form>
        </div>
    )
}

export default CourseBuilderForm;