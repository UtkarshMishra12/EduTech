import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { FaLongArrowAltLeft } from "react-icons/fa";


function ForgotPassword(){

    const {loading} = useSelector((state) => state.auth);
    const[emailSent, setEmailSent] = useState(false);
    const[email, setEmail] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        // this function works - if mail sent with otp successfully then the setEmailSent make TRUE
        dispatch(getPasswordResetToken(email, setEmailSent));
        
    }
    
    return(
        
        <div className="text-white flex justify-center items-center h-[90vh] gap-y-5 mx-auto w-[50%]">
          {
            loading? (
                <div> (<span className="loader"></span>)</div>
            )
            :
            (
                <div className="flex flex-col justify-center gap-y-5">
                    <h1 className="text-white text-2xl font-bold ">
                        {
                            !emailSent ? "Reset Password" : "Check your email for the reset link"
                        }
                    </h1>

                    <p  className="text-xl text-richblack-200">
                        {
                            !emailSent ? 
                            "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" 
                            :
                            `We have sent the reset email to  ${email}`
                        }
                    </p>

                    <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
                            <div>
                                {
                                    !emailSent && (
                                        <label>
                                            <p className="text-sm capitalize">Email address <span className="text-pink-200">*</span></p>
                                            <input className="w-full mt-2 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" required type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="enter your email address" />
                                        </label>
                                    )
                                }
                            </div>

                            <button className="text-black capitalize px-5 py-2 bg-yellow-100 rounded-md " type="submit">
                                {
                                    !emailSent ? "Reset Password" : "Resend Email"
                                }
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

export default ForgotPassword;