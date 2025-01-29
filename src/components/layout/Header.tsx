'use client'
import { logoutHandler } from '@/utils/auth';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
    const pathname = usePathname();

    const bread = pathname === "/" ? "Home" : "Home > " + pathname.substring(1);
    return (
        <header>
            <div className="bg-[#14b1bb] text-white">
                <div className="container m-auto pb-1">
                    <div><span className="material-icons material-symbols-outlined text-xl relative top-[5px] mr-2">mail</span>artem.kamkov@gmail.com</div>
                </div>
            </div>
            <div className="dark:bg-[#1e1f23] bg-white">
                <div className="container m-auto py-4 flex flex-col sm:flex-row sm:justify-between items-center">
                    <Link className="logo text-3xl font-bold" href="/">Dogs Shelter</Link>
                    <div>
                        <Link className="hover:underline" href="/">Home</Link>
                        <Link className="ml-2 hover:underline" href="/search">Search</Link>
                        <Link className="ml-2 hover:underline" href="/match">Match</Link>
                        <button className="ml-8" onClick={logoutHandler}>Log out</button>
                    </div>
                </div>
            </div>
            <div className="bg-[#1e1f23] text-white mb-6">
                <div className="container m-auto py-4">
                    <div>{bread}</div>
                </div>
            </div>
        </header>
    );
}