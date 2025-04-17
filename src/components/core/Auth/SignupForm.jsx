import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useNavigate } from "react-router-dom"


function SignupForm(){
  const[formData, setFormData]= useState({
      firstName:"", 
      lastName:"",
      email:"",
      password:"",
      confirmPassword:"",
  })

  const[showPassword, setShowPassword] = useState(false);
  const[showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const[accountType, setAccountType]= useState("student");

  function changeHandler(event){
      setFormData( (prevData) =>(
          {
              ...prevData,
              [event.target.name] : event.target.value
          }
      ))
  }

  function submitHandler(event){
      event.preventDefault();
      if(formData.password !== formData.confirmPassword){
          toast.error("Password do not Match");
          return;
      }
      toast.success("Account Created");
      const accountData= {
          ...formData
      };

      const finalData = {
        ...accountData,
        accountType
      }
      console.log("Printing Data of new customer");
      console.log(finalData);
      navigate("/dashboard");
  }

  return (
    <div>
      {/* Student Instructor Tab */}
      <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>
        <button className={`${accountType === "student" 
          ?
            "bg-richblack-900 text-richblack-5"
          :"bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`} 
          onClick={() => setAccountType("student")}>Student</button>
        <button className={`${accountType === "instructor" 
          ?
            "bg-richblack-900 text-richblack-5"
          :"bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`} 
          onClick={()=> setAccountType("instructor")}>Instructor</button>
      </div>

      <form onSubmit={submitHandler}>

         {/* First and Last Name */}
        <div className='flex flex-col md:flex-row gap-4 mt-[20px]'>
          <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
              First Name<sup className='text-pink-200'>*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              onChange={changeHandler}
              value={FormData.firstName}
              className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] '
            />
          </label>

          <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
              Last Name<sup className='text-pink-200'>*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              onChange={changeHandler}
              value={FormData.lastName}
              className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
          </label>
        </div>

        {/* Email Holder */}
        <div  className='mt-[20px]'>
        <label className='w-full mt-[20px]' >
              <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email<sup className='text-pink-200'>*</sup></p>
              <input
                  required
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  onChange={changeHandler}
                  value={FormData.email}
                  className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
              />
        </label>
        </div>
        
        {/* Create Pasword and Confirm Password */}
        <div className='w-full flex flex-col md:flex-row gap-4 mt-[20px] '>
          <label className='w-full relative'>
              <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Create Password<sup className='text-pink-200'>*</sup></p>
              <input
                  required
                  type= {showPassword ? ("text") : ("password")}
                  name="password"
                  placeholder="Enter Password"
                  onChange={changeHandler}
                  value={FormData.password}
                  className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
              />
              <span className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/> : <AiOutlineEye fontSize={24} fill='#AFB2BF'/>}
              </span>
          </label>

          <label className='w-full relative'>
              <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Confirm Password<sup className='text-pink-200'>*</sup></p>
              <input
                  required
                  type= {showConfirmPassword ? ("text") : ("password")}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={changeHandler}
                  value={FormData.confirmPassword}
                  className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
              />
              <span className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setShowConfirmPassword((prev) => !prev)}>
              {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/> : <AiOutlineEye fontSize={24} fill='#AFB2BF'/>}
              </span>
          </label>
        </div>

        <button  className=' w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>Create Account</button>


      </form>
    </div>
  );
}

export default SignupForm;