"use client"

import {getSignupSchema} from "@/app/_lib/validationSchema";
import {useState} from "react";
import {signup} from "@/app/[locale]/signup/action";

export default function Signup({ params }) {
    const locale = params.locale;
    const schema = getSignupSchema(locale);

    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("locale", locale);
        form.append("name", formData.name);
        form.append("email", formData.email);
        form.append("password", formData.password);

        const result = await signup(form);

        console.log("RES", result);

        if (!result.success) {
            setErrors({
                name: result.error.name?._errors[0] || "",
                email: result.error.email?._errors[0] || "",
                password: result.error.password?._errors[0] || "",
                messages: result.error.messages?._errors[0] || "",
            });
        } else {
            setErrors({})
            setFormData({ name: "", email: "", password: "", messages: "" })
        }
    };

    return (
        <div className={"w-full h-screen flex justify-center items-center"}>
            <form onSubmit={handleSubmit} className={"flex flex-col justify-center items-center w-1/3 bg-sky-900 p-5 rounded-xl shadow-lg"}>
                <h1 className={"text-2xl pb-2"}>Sign up Page</h1>
                <div className={"flex flex-col justify-center my-2 w-5/6"}>
                    <label>username</label>
                    <input
                        type="text"
                        name={"name"}
                        className="p-2 mt-1 border border-gray-300 rounded-md bg-white text-black"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div className={"flex flex-col justify-center my-2 w-5/6"}>
                    <label>email</label>
                    <input
                        type="email"
                        name={"email"}
                        className="p-2 mt-1 border border-gray-300 rounded-md bg-white text-black"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                <div className={"flex flex-col justify-center my-2 w-5/6"}>
                    <label>password</label>
                    <input
                        type="text"
                        name={"password"}
                        className="p-2 mt-1 border border-gray-300 rounded-md bg-white text-black"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                </div>
                {errors.messages && <p className="text-red-500">{errors.messages}</p>}
                <button type="submit" className={"bg-sky-500 w-1/2 py-2 mt-2 rounded-md cursor-pointer"}>Sign up</button>
            </form>
        </div>
    )
}