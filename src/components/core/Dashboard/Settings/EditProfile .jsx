import React from "react";
import { useState } from "react";
import { set } from "react-hook-form";
import { useSelector } from "react-redux";  


function EditProfile() {
    const { user, loading:profileLoading } = useSelector((state) => state.profile);
    const {token, loading:authLoading} = useSelector((state) => state.auth);
    
    const[selectedImage, setSelectedImage] = useState(null);
    function handleImageChange(event) {
        const file= event.target.files[0];
        if(file){
            setSelectedImage(URL.createObjectURL(file));
        }
    }
    return(
        <>
          <div className="flex flex-row gap-6 mt-10">

            <div>
                <img src={user?.image || selectedImage} alt="User" />
            </div>

            <div className="flex flex-col gap-4">
                <h1>Chane Profle Picture</h1>

                <div classname="flex flex-row">
                    <div>
                    <label htmlFor="profileImage" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md">
                        Select
                    </label>
                    <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                    </div>
                </div>

                <div classname="flex flex-row">
                    <div>
                    <label htmlFor="profileImage" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md">
                        Select
                    </label>
                    <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                    </div>
                </div>
            </div>
          </div>
        </>
    )
}

export default EditProfile;