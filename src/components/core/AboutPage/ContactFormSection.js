import React from "react";
import ContactUsForm from "../ContactPage/ContactUsForm";

const ContactFormSection = () =>{

    return(
        <div className="mx-auto flex flex-col gap-5 mt-10 mb-20 py-10 px-5">
            <h1 className="text-4xl font-bold flex justify-center items-center">
                Get in Touch
            </h1>
            <p className="text-center">
                We'd love to here for you, Please fill out this form.
            </p>

            <div>
                <ContactUsForm />
            </div>

        </div>
    )
}

export default ContactFormSection ;