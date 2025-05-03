
import React, { useState } from "react";

import {sidebarLinks as LINKS} from "../../../data/dashboard-links";
import {logout} from "../../../services/operations/authAPI" ;
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfiramtionModal from "../../Common/ConfirmationModa";
import IconBtn from "../../Common/IconBtn";
import CTAButton from "../../../components/core/HomePage/Button";

import { FaArrowAltCircleRight } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";




const Sidebar = () => {

    const {user, loading: profileLoading} = useSelector((state)=> state.profile) ;
    const {loading: authLoading} = useSelector((state)=> state.auth) ;

    const [clicked, setClicked] = useState(false);

    const dispatch = useDispatch();
    const naviagte = useNavigate ();
    const [confirmationModal , setConfirmationModal] = useState(null);

    if(profileLoading || authLoading){

        return(
            <div>
                <span className="spinner"></span>
            </div>
        )
    }

    console.log("LINKS==>",LINKS);
    console.log("clicked==>", clicked);

    return(
        <>
            
            <div className={`flex transition-all ease-out duration-200 min-w-[222px] flex-col border-r-[1px]  border-richblack-700  h-[100%] bg-richblue-800 py-10
            absolute z-[5000] ${clicked?  "left-0" : "left-[-222px]" }
            md:relative md:left-0 
             `} >

                
                <p 
                onClick={() => setClicked(prev => !prev)}
                className="absolute  text-[25px] visible md:hidden top-2 right-[-20px] z-[1000] text-yellow-100" >{!clicked ? <div className="animation animate-pulse duration-100"><FaArrowAltCircleRight /></div> : <IoMdCloseCircle /> }</p>
                


                <div className="flex flex-col">
                    {
                        LINKS.map((link, index)=>{
                            if(link.type && user?.accountType !== link.type){

                                console.log("link.type and user?.accountType", link.type, user?.accountType);
                                console.log("link.type", link.type);

                                return null;
                            }
                            console.log("link=", link);
                            return(
                                

                                    <SidebarLink setClicked={setClicked} key={link?.id} iconName={link?.icon} link={link} />
                                
                                
                            )
                        })
                    }
                </div>

                <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600 " >
                    <div className="flex flex-col " >
                        <SidebarLink link={{name:"Settings", path:"dashboard/settings"}}  iconName="VscSettingsGear"
                        />
                    </div>

                    <button
                    onClick={()=>{
                        setConfirmationModal(
                            {
                                text1 : "Are You Sure ?",
                                text2 : "You will be logged out",
                                btn1Text : "Logout",
                                btn2Text : "Cancel",
                                btn1Handler : () => dispatch(logout(naviagte)),
                                btn2Handler : () => setConfirmationModal(null),
                            }
                        )
                    }}
                    className="text-sm font-medium text-richblack-300 "
                    >
                     
                        <div className="flex text-center text-[13px] px-6 py-2 hover:cursor-pointer hover:scale-95 transition-all duration-200 rounded-md font-bold bg-yellow-50 text-black items-center gap-x-2 justify-center mt-5 ml-5" >
                          <VscSignOut className="text-lg" />

                          <span>Logout</span>
                        </div>
                    </button>



                </div>

            </div>  

            {confirmationModal && <ConfiramtionModal modalData={confirmationModal} /> }

        </>
    )
}

export default Sidebar ;
