"use client"
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "@/constants";

export default function LoginForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const [errors, setErrors] = useState<{ name?: string, email?: string }>({});

    const validate = () => {
        const newErrors: { name?: string, email?: string } = {};
        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            newErrors.email = "Invalid email format.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push('/search');
            }
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
              }
        } catch (error) {
            if(error instanceof Error){
                toast.error(error.message);
            }
            return Promise.reject(error);
        }
    };

    return (
        <form className="dark:bg-[#1e1f23] dark:text-white w-[340px] border-[1px] border-[#efefef] rounded-md drop-shadow-2xl bg-white p-4 mt-5" onSubmit={handleSubmit}>
            <h3 className="text-2xl mb-2 text-center">Log in</h3>
            <div className="mb-2">
                <input
                    type="text"
                    name="name"
                    placeholder="Name..."
                    className="block w-[100%] h-[42px] border-[1px] border-[#efefef] rounded-md px-2 dark:text-black"
                    onChange={handleChange}
                    value={formData.name}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            </div>

            <div className="mb-2">
                <input
                    type="text"
                    name="email"
                    placeholder="Email..."
                    className="block w-[100%] h-[42px] border-[1px] border-[#efefef] rounded-md px-2 dark:text-black"
                    onChange={handleChange}
                    value={formData.email}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>


            <input type="submit" className="block w-[100%] border-[1px] border-[#efefef] rounded-md bg-[#14b1bb] py-2 text-white mt-2 hover:opacity-85 cursor-pointer" />
        </form>
    );
}
