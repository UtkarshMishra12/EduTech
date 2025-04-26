import React, { useEffect, useState } from "react";
import { Link, Route, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const subLinks = [
    {
        title: "Python",
        link:"/catalog/python"
    },
    {
        title:"Web Development",
        link:"/catalog/web-development"
    }
]

function Navbar(){

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);  
    const {totalItems} = useSelector((state) => state.cart);
    
    
    const location = useLocation();

    const [ssubLinks, setSsubLinks]  = useState([]);

    const fetchSublinks = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing Sublinks result:" , result);
            setSsubLinks(result.data.data);
        }
        catch(error) {
            console.log("Could not fetch the category list");
        }
    }


    useEffect( () => {
        fetchSublinks();
    },[] )
    

    const matchRoute = (route) =>{
        return matchPath({path:route}, location.pathname);
    }
    return(
        <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
           
           <div className="w-11/12 flex flex-row max-w-maxContent items-center justify-between">
                <Link to="/">
                    <img src={logo} alt="" width={160} height={42} loading="lazy" />
                </Link>
                
                <nav>
                    <ul className="flex gap-x-6 text-richblack-25">
                    {
                        NavbarLinks.map( (link,index) => (
                            <li key={index}>
                                {
                                    link.title === "Catalog" ? 
                                    (
                                        <div className="relative flex items-center gap-x-2 cursor-pointer group">
                                            <p>{link.title}</p>
                                            <IoIosArrowDropdownCircle/>

                                            <div className="invisible absolute left-[50%] top-[50%] flex flex-col
                                            rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] translate-x-[-50%] translate-y-[80%]">

                                            <div className="absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-5 translate-x-[80%] translate-y-[-45%] ">
                                            </div>

                                            {
                                                subLinks.length ? 
                                                (
                                                    subLinks.map( (subLink, index) =>(
                                                        <Link to={`${subLink.link}`} key={index}>
                                                           <p>{subLink.title}</p>
                                                        </Link>
                                                    ))
                                                ) 
                                                : 
                                                (<div></div>)
                                            }

                                            </div>
                                        </div>
                                    ) 
                                    : 
                                    (
                                        <Link to={link?.path}>
                                        <p  className={`${
                                           matchRoute(link?.path)
                                           ? "text-yellow-25"
                                           : "text-richblack-25"
                                        }`}>
                                            {link.title}
                                        </p> 
                                        </Link>
                                    )
                                }
                            </li>
                        ))
                    }
                    </ul>
                </nav>

                {/* Login and Sign Up Button and Dashoard*/}
                <div className="flex items-center  ">
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className="relative text-white">
                                <AiOutlineShoppingCart/>
                                {
                                    <div className="absolute top-[-8px] right-[-4px] flex items-center justify-center h-4 w-4 rounded-full bg-yellow-100">
                                        {
                                            totalItems > 0 && (
                                              <span>
                                                {totalItems}
                                           </span>
                                            )
                                        }
                                    </div>
                                }
                            </Link>
                        )
                    }

                    {
                        token===null &&(
                            <Link to="/login">
                              <button className="border border-richblack-700 bg-richblue-800 px-[12px] py-[8px] text-richblack-100 rounded-md mr-3">
                                 Login
                              </button>
                            </Link>
                        )
                    }

                    {
                        token===null &&(
                            <Link to="/signup" >
                              <button className="border border-richblack-700 bg-richblue-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                                 Signup
                            </button>
                            </Link>
                        )
                    }

                    {
                        token !== null && (
                            <ProfileDropDown/>
                        )
                    }

                </div>

           </div>

        </div>
    )
}

export default Navbar;