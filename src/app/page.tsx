'use client'
import LoginForm from "@/components/LoginForm";
import { useEffect } from "react";
import { toast } from 'react-toastify';

export default function Home() {
  useEffect(() => {
    const message = sessionStorage.getItem("toastMessage");
    if (message) {
      toast.error(message);
      sessionStorage.removeItem("toastMessage");
    }
  }, []);

  return (
    <main className="flex items-center flex-col flex-grow">
      <h1 className="text-xl">Welcome to the Dog Shelter!</h1>

      <LoginForm />
    </main>
  );
}