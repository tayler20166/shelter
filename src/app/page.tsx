'use client'
import LoginForm from "@/components/LoginForm";
import { useState, useEffect } from 'react';

export default function Home() {
  const [logged, setLogged] = useState<string | null>(null);

  useEffect(() => {
    setLogged(localStorage.getItem('logged') || 'false');
  }, []);


  return (
    <main className="flex items-center flex-col flex-grow">
      <h1 className="text-xl">Welcome to the Dog Shelter!</h1>

      {logged !== 'true' && logged !== null  && <LoginForm />}
    </main>
  );
}