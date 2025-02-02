import type { Metadata } from "next";
import "./globals.css";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: "Dog Shelter | Home",
  description: "This website purpose is to help a dog-lover like yourself search through a database of shelter dogs, with the hope of finding a lucky dog a new home",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex items-center flex-col flex-grow">
            {children}
          </main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </body>
    </html>
  );
}
