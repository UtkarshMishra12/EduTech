import react from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CTAbutton from "./Button";
import { FaArrowRight } from "react-icons/fa";

function InstructorSection(){
    return (
      <div className="mt-16">
        <div className="flex flex-row gap-20 items-center">
          <div className="w-[50%]">
            <img
              src={Instructor}
              alt="Instructor"
              className="shadow-white instructor-bg-shadow"
            />
          </div>

          <div className="flex flex-col gap-5 w-[50%]">
            <div className="text-4xl font-semibold w-[50%]">
              Become as <HighlightText text={"Instructor"} />
            </div>

            <p className="text-[16px] font-medium w-[80%] text-richblack-300">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>

            <div className="w-fit">
              <CTAbutton
                active={true}
                linkto={"/signup"}
                className="flex flex-row items-center  gap-2"
              >
                <div className="flex flex-row items-center gap-2">Start Teaching Today
                <FaArrowRight />
                </div>
              </CTAbutton>
            </div>
          </div>
        </div>
      </div>
    );
}

export default InstructorSection;