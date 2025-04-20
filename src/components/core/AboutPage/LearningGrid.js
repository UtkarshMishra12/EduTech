import React from "react";
import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../HomePage/Button" ;

const LearningGrid = () => {


    const LearningGridArray = [
        {
          order: -1,
          heading: "World-Class Learning for",
          highlightText: "Anyone, Anywhere",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
          BtnText: "Learn More",
          BtnLink: "/",
        },
        {
          order: 1,
          heading: "Curriculum Based on Industry Needs",
          description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
          order: 2,
          heading: "Our Learning Methods",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 3,
          heading: "Certification",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 4,
          heading: `Rating "Auto-grading"`,
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 5,
          heading: "Ready to Work",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
      ];


    return(
        <div className="grid mx-auto my-2 grid-col-1 lg:grid-cols-4 mt-20 ">
            {
                LearningGridArray.map((card, index)=>{
                    return(
                        <div key={index} className={`${card.order === -1 && "lg:col-span-2 bg-richblack-900  lg:h-[250px] "} ${card.order % 2 === 1 ? "bg-richblack-700 lg:h-[250px]" : "bg-richblue-800 lg:h-[250px]"} ${card.order === 3 && "lg:col-start-2 lg:h-[250px]"} `}>
                            {
                                card.order < 0 ? 
                                (
                                    <div className="lg:w-full h-full flex flex-col pb-5 bg-richblack-900  gap-3">
                                        <div className="text-4xl font-semibold" >
                                            {card.heading + " "}
                                            <HighlightText text={card.highlightText} />
                                        </div>
                                        <p className="font-medium ">
                                            {card.description}
                                        </p>
                                        <div className="w-fit">
                                            <CTAButton active={true} linkto={card.link}>
                                                {card.BtnText}
                                            </CTAButton>
                                        </div>
                                    </div>
                                ) :
                                (
                                    <div className="flex items-baseline h-full justify-center p-5 flex-col">
                                        <h1 className="text-xl">
                                            {card.heading}
                                        </h1>
                                        <p className="text-richblack-200">
                                            {card.description}
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }

        </div>

    )
}

export default LearningGrid ;