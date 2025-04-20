import React from 'react';
import HighlightText from '../components/core/HomePage/HighlightText';
import BannerImage1 from "../assets/Images/aboutus1.webp" ;
import BannerImage2 from "../assets/Images/aboutus2.webp" ;
import BannerImage3 from "../assets/Images/aboutus3.webp" ;
import Quote from '../components/core/AboutPage/Quote';
import FoundingStory from "../assets/Images/FoundingStory.png";
import StatsComponent from '../components/core/AboutPage/StatsComponent';

function About(){
    return(
        <>
        <div className="mt-[50px] w-11/12 max-w-maxContent mx-auto text-white">
          
           {/* Section 1 */}
           <section>
                <div className="">
                    <header className="text-center text-4xl w-[70%] mx-auto font-bold">
                        Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"} />
                    </header>
                    <p className="text-lg text-center w-[70%] mx-auto mt-3 text-richblack-200">Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>

                    <div className="flex flex-col w-[50%] md:w-full  md:flex-row mt-14 gap-6 mx-auto">
                        <img src={BannerImage1} alt="Banner1" />
                        <img src={BannerImage2} alt="Banner2" />
                        <img src={BannerImage3} alt="Banner3" />
                    </div>



                </div>
           </section>

            {/* section 2 */}
            <section >
                <div className="text-4xl  border-b-[0.5px] mb-10 mt-8 text-center font-semibold py-7">
                    <Quote />
                </div>
            </section>

            {/* section 3 */}
            <section>
                <div className="flex w-full items-center justify-center flex-col mt-14 gap-y-8 py-10">

                    {/* founding story upper  box */}
                    <div className="flex md:flex-row flex-col gap-y-5 item-center justify-center gap-x-5 mb-4 ">
                    
                        {/* left box founding story */}
                        <div className="md:w-[50%] w-full mx-auto flex flex-col gap-y-5">
                            <p className="text-3xl"><HighlightText  text={"Our Founding Story"}></HighlightText></p>
                            <p className="text-[15px] text-richblack-100">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                            <p className="text-[15px] text-richblack-100">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                        </div>

                        {/* founding story right box */}
                        <div className="md:w-[50%] mx-auto w-full my-auto">
                            <img src={FoundingStory} alt="" />
                        </div>

                    </div>

                    {/* vision and mission */}
                    <div className="flex flex-col md:flex-row gap-x-10 gap-y-5 mt-10 justify-center items-center ">

                        {/* left box - our vision */}
                        <div className="flex flex-col gap-y-4 mt-4">
                            <p className="text-3xl"><span className="text-brown-200 font-bold">Our Vision</span></p>
                            <p className="text-[15px] text-richblack-100">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                        </div>

                        {/* right box- our mission */}
                        <div className="flex flex-col gap-y-4">
                            <p className="text-3xl"><HighlightText text={"Our Mission"} /></p>
                            <p className="text-[15px] text-richblack-100">Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                        </div>



                    </div>

                </div>
            </section>

            {/* section 4 */}
            <StatsComponent/>

            
            {/* section 5 */}


        </div>
        </>
    )
}

export default About;