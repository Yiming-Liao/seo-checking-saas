"use client"

import { usePathname } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation"
import UserCard from "./UserCard";
import { useSession } from "next-auth/react";

const Navbar = () => {
    const pathname = usePathname();
    // const locale = useLocale();
    const t = useTranslations('Navbar');

    const { data: session } = useSession();

    return (
        <header className="fixed top-0 z-[99999] w-full h-24 p-2 flex justify-center items-center">
            <nav className="container h-full px-2 rounded-lg boxShadow bg-white flex justify-between items-center">
                <div className="flex gap-4">
                    <Link href={`/`} className="rounded-lg flex justify-center items-center">
                        <i className="w-32 h-16 text-xl font-semibold text-white bg-primary rounded flex justify-center items-center">SEO UP</i>
                    </Link>
                    <Link href={`/result`} className="w-32 h-16 border-2 rounded-lg flex justify-center items-center">
                        <p>{t('recent_report')}</p>
                    </Link>
                </div>


                <div className="flex items-center ">

                    <div className="flex gap-4">
                        <Link href={pathname} locale="en" className="border-2 p-2 rounded-md">EN</Link>
                        <Link href={pathname} locale="zh" className="border-2 p-2 rounded-md">中</Link>
                    </div>
                    <div className="w-64 flex justify-end items-center gap-4">
                        {session && <Link href={`/dashboard`} className={`w-32 h-16 border-2 rounded-lg flex justify-center items-center ${session && "show-up"}`}>{t('dashboard')}</Link>}
                        {/* User Card */}
                        <UserCard />
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Navbar;