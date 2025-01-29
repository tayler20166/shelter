'use client'
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main className="flex items-center flex-col flex-grow">
      <h1 className="text-xl">Welcome to the Dog Shelter!</h1>

      <LoginForm />
    </main>
  );
}