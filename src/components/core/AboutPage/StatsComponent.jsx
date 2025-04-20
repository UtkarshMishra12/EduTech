import React from "react";

const StatsComponent = () => {

    const Stats = [
        {count : "5K", label : "Active Students"},
        {count : "10+", label : "Mentors"},
        {count : "100+", label : "Courses"},
        {count : "50+", label : "Awards"},
    ]

    return(
        <section>
            <div>
                <div className="flex md:flex-row flex-col gap-y-3 left-0 my-7  w-full p-10 bg-richblack-700 ">
                    {
                        Stats.map((data, index) =>{
                            return(
                                <div className="flex w-full items-center flex-col justify-center" key={index}>
                                    <p className="text-3xl font-bold ">{data.count}</p>
                                    <p className="text-richblack-500 ">{data.label}</p>
                                </div>
                            )
                        } )
                    }
                </div>
            </div>
        </section>
    )
}

export default StatsComponent ;