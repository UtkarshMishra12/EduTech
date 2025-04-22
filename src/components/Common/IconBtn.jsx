import React from "react";
import { useNavigate } from "react-router-dom";

const IconBtn = ({text, onclick, children, disabled, outline=false, customClasses, type}) => {

    const navigate = useNavigate();
    

    return(
        <button className="flex text-center md:text-[13px] text-[10px]  px-2 py-1 md:px-6 md:py-2 hover:cursor-pointer hover:scale-95 transition-all duration-200 rounded-md font-bold bg-yellow-50 text-black items-center gap-x-2 justify-center" disabled={disabled} onClick={onclick} type={type}>
            {
                children ? (
                    <>
                        <span>{text}</span>
                        {children}
                    </>
                ) : (text) 
            }
        </button>
    )
}

export default IconBtn ;