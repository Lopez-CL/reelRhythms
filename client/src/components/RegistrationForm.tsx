'use client'
import React, { useState } from "react";
import * as Types from "@/types/index";
import * as Hooks from "@/hooks/index";
import { useRouter } from "next/navigation";
const RegForm: React.FC = () => {
    const [formData, setFormData] = useState<Types.userData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        profImg: null
    })
    const router = useRouter()
    const handleInput = Hooks.useNativeInput(formData, setFormData)
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const multPtData = new FormData();
        multPtData.append("username", formData.username)
        multPtData.append("email", formData.email)
        multPtData.append("password", formData.password)
        multPtData.append("confirmPassword", formData.confirmPassword)
        if (formData.profImg instanceof File) multPtData.append("profImg", formData.profImg);
        // for(const key in formData){
        //     const typedKey = key as keyof typeof formData
        //     const value = formData[typedKey]
        //     if(value !== null) multPtData.append(key, value)
        // }
        try {
            fetch("http://localhost:8000/backend/api/users/register", { method: "POST", body: multPtData })
                .then(() => {
                    console.log("sent fetch")
                    router.push('/dashboard')
                })
        } catch (e) { console.log(e) }
        // alert(JSON.stringify(formData));
        // const resetFormData = Object.keys(formData).reduce((acc, key)=>{
        //     acc[key] = ''
        //     return acc;
        // }, {} as typeof formData)
        // setFormData(resetFormData);
    }
    return (
        <form className="form form-register">
            <input value={formData.username} name="username" onChange={handleInput} type="text" aria-label="username" placeholder="Username" />
            <input required value={formData.email} name="email" onChange={handleInput} type="email" aria-label="email" placeholder="Email" />
            <input value={formData.password} name="password" onChange={handleInput} type="password" autoComplete="new-password" aria-label="password" placeholder="password" />
            <input value={formData.confirmPassword} name="confirmPassword" onChange={handleInput} type="password" autoComplete="new-password" aria-label="confirm password" placeholder="confirm password" />
            <input name="profImg" type="file" onChange={handleInput} aria-label="upload profile image" />
            <button onClick={handleSubmit}>Register With Us</button>
        </form>
    )
}

export default RegForm;