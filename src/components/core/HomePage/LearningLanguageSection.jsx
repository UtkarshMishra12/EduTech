import React from "react";
import HighlightText from "./HighlightText";
import knowYourProgress from "../../../assets/Images/Know_your_progress.png";
import compareWithOthers from "../../../assets/Images/Compare_with_others.png";
import planYourLesson from "../../../assets/Images/Plan_your_lessons.png" ;
import CTAbtn from "../HomePage/Button";
function LearningLanguageSection() {
    return (
      <div className="mt-[130px] mb-32">
        <div className="flex flex-col items-center gap-5">
          <div className="text-4xl font-semibold text-center">
            Your Swiss knife for
            <HighlightText text={"learning any language"} />
          </div>

          <div className="text-center text-richblack-600 mx-auto text-base font-medium w-[70%]">
            Using spin making learning multiple languages easy. with 20+
            languages realistic voice-over, progress tracking, custom schedule
            and more.
          </div>

          <div className="flex flex-row items-center justify-center mt-5">
            <img
              src={knowYourProgress}
              alt="knowyourprogress"
              className="object-contain -mr-32"
            />
            <img
              src={compareWithOthers}
              alt="knowyourprogress"
              className="object-contain"
            />
            <img
              src={planYourLesson}
              alt="knowyourprogress"
              className="object-contain -ml-36"
            />
          </div>

          <div className="w-fit">
            <CTAbtn active={true} linkto={"/signup"}>
              <div>Learn More</div>
            </CTAbtn>
          </div>
        </div>
      </div>
    );
}

export default LearningLanguageSection;