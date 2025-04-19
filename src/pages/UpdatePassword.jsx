import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";
import { Link, useLocation, useParams } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import { FaLongArrowAltLeft } from "react-icons/fa";
const UpdatePassword = () =>{

    const {loading} = useDispatch((state) => state.auth) ;
    const dispatch = useDispatch() ;

    const [showPassword, setShowPassword] = useState(false) ;
    const [showConfirmPassword, setShowConfirmPassword] = useState(false) ;
    const [formData, setFormData] = useState(
        {
            password : "",
            confirmPassword : "" ,
        }
    )

    console.log("formdata= >", formData);

    function handleOnChange(e) {
        e.preventDefault() ;

        setFormData((prevData) => ( 
        {
            ...prevData ,
            [e.target.name] : e.target.value ,
        }
        ))

    }

    const {password, confirmPassword} = formData ;
    // getting token from URL
    const location = useLocation() ;
    const {id} = useParams();
    //console.log("[[[[[[[[[[[[[[[[[[[[id", id);
    const token = location.pathname.split("/").at(-1);
    

    function handleOnSubmit(e) {
        e.preventDefault() ;
        console.log("token=>",token);
        dispatch(resetPassword(password, confirmPassword, token));

    }

    return(
        <div className="flex items-center justify-center h-[90vh] ">
            {
                loading ? (
                    <span className="loader"></span>
                ) : (
                    <div className="w-[50%] flex-col flex gap-y-5 mx-auto text-white ">
                        <h1 className="text-2xl font-bold ">Choose  new password</h1>
                        <p>Almost done. Enter your new password and youre all set.</p>

                        <form  onSubmit={handleOnSubmit}>

                            <label className="relative ">
                                <p className="text-sm capitalize">New Password <span className="text-pink-200">*</span></p>
                                <input placeholder="Enter New Password" className="w-full mt-2 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" required type={showPassword ? "text" : "password"} value={password} name="password" onChange={handleOnChange} />
                                <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                    >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )}
                                </span>
                            </label>

                            <label className="relative ">
                                <p className="text-sm capitalize mt-7">Confirm New Password <span className="text-pink-200">*</span></p>
                                <input placeholder="Enter Confirmed New Password" className="w-full mt-2 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" required type={showConfirmPassword ? "text" : "password"} value={confirmPassword} name="confirmPassword" onChange={handleOnChange} />
                                <span
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute right-3 top-[100px] z-[10] cursor-pointer"
                                    >
                                    {showConfirmPassword ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )}
                                </span>
                            </label>

                            <button className="text-black capitalize mt-4 px-5 py-2 bg-yellow-100 rounded-md " type="submit">
                                Reset Password
                            </button>

                        </form>

                        <div className="flex items-center justify-start gap-2 text-sm hover:text-blue-200">
                            <FaLongArrowAltLeft />
                            <Link to={"/login"}>
                                <p>Back to login</p>
                            </Link>
                        </div>

                    </div>
                )
            }

        </div>
    )
}

export default UpdatePassword;