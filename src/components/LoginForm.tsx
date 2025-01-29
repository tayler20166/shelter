"use client"
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const router = useRouter();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            localStorage.setItem('logged', 'true');
            router.push('/search');
        } 

    };

    return (
        <form className="w-[340px] border-[1px] border-[#efefef] rounded-md drop-shadow-2xl bg-white p-4 mt-5" onSubmit={handleSubmit} >
            <h3 className="text-2xl mb-2 text-center">Log in</h3>
            <input type="text" name="name" className="block w-[100%] h-[42px] border-[1px] border-[#efefef] rounded-md mb-2 px-2" onChange={handleChange} />
            <input type="text" name="email" className="block w-[100%] h-[42px] border-[1px] border-[#efefef] rounded-md mb-2 px-2" onChange={handleChange} />
            <input type="submit" className="block w-[100%] border-[1px] border-[#efefef] rounded-md bg-[#14b1bb] py-2 text-white" />
        </form>
    )
}