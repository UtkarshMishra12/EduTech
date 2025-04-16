import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png"



const timeLine = [
    {
        Logo : Logo1,
        heading : "Leadership",
        description : "Fully commited to the success company"
    },
    {
        Logo : Logo2,
        heading : "Responsibility",
        description : "Students will always be our top priority"
    },
    {
        Logo : Logo3,
        heading : "Flexibility",
        description : "The ability to switch is an important skills"
    },
    {
        Logo : Logo4,
        heading : "Solve the Problem",
        description : "Code your way to a solution"
    },
]

function TimelineSection() {
  return (
    <div>
       
       <div className="flex gap-3 flex-col md:flex-row gap-15 items-center">
          
          <div className="w-full md:w-[45%] flex flex-col gap-5">
            {
                timeLine.map( (element,index) =>{
                   return (
                     <div className="flex flex-row gap-5 " key={index}>
                       <div className="h-[50px] w-[50px] bg-white flex justify-center items-center">
                         <img src={element.Logo} alt="" />
                       </div>

                       <div>
                         <h2 className="font-semibold  text-[18px] ">
                           {element.heading}
                         </h2>
                         <p className="text-base">{element.description}</p>
                       </div>
                     </div>
                   );
                })
            }
          </div>
           
          <div className="relative shadow-blue-200">
             <img src={timelineImage} alt="timeline" 
             className="shadow-white object-cover h-fit"/>

             <div className="absolute bg-caribbeangreen-700 text-white uppercase flex flex-row py-7 px-7      md:py-10  md:px-10 left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="flex flex-row items-center gap-5 md:gap-5 border-r border-caribbeangreen-300 pr-2 md:pr-5">
                   <p className="text-xl md:text-3xl font-bold">10</p>
                   <p className="text-caribeangreen-300 text-sm md:font-sm">Years of Experience</p>
                </div>

                <div className="flex flex-row md:gap-5  gap-5 items-center px-7 md:px-7">
                <p className="text-xl md:text-3xl font-bold">250</p>
                <p className="text-caribeangreen-300 text-sm md:font-sm">Types of Course</p>
                </div>
             </div>

          </div>
          
       </div>
    </div>
  );
}

export default TimelineSection;