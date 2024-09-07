import { Link } from "@/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const UserCard = () => {
    const { data: session } = useSession();
    const t = useTranslations('Navbar');

    const [isOpen, setIsOpen] = useState<Boolean>(false);
    const userCardRef = useRef<HTMLDivElement>(null);

    // 點擊 UserCard 外部也能關閉
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (!isOpen) return;
            if (userCardRef.current && !userCardRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [isOpen]);


    return (
        <div className="relative">
            {/* 未開啟 Avatar */}
            {!session ? (
                // 未登入 
                <button onClick={() => signIn('google')} className="w-28 h-16 rounded bg-gradient-to-br from-slate-50 to-slate-200 shadow-md flex justify-center items-center gap-3">
                    <Image src={'/images/google.png'} width={20} height={20} alt={""} />
                    {t('login')}
                </button>
            ) : (
                // 已登入 
                <button onClick={() => setIsOpen(prev => !prev)} className="size-16 rounded bg-gradient-to-br from-slate-100 to-slate-300 shadow-md flex justify-center items-center">
                    <Image src={session.user.image} alt="" width={80} height={80} priority={true}
                        className={`rounded-lg ${session && "show-up"}`}
                    />
                </button>
            )}
            {/* 開啟 User card */}
            {isOpen &&
                <div ref={userCardRef} className="absolute -top-1 -right-1 w-72 h-56 rounded bg-gray-100 shadow-lg py-1 px-1">
                    {session &&
                        <div className="h-full flex flex-col justify-between">
                            <div className="w-full flex justify-end items-center">
                                {/* Name */}
                                <p className="text-xl mx-auto">{session.user.name}</p>
                                {/* Avatar */}
                                <button onClick={() => setIsOpen(prev => !prev)} className="size-16 rounded bg-gradient-to-br from-slate-100 to-slate-300 shadow-md">
                                    <Image src={session.user.image} alt="" width={80} height={80} priority={true}
                                        className={`rounded  flex justify-center items-center`}
                                    />
                                </button>
                            </div>
                            <div className="h-full text-nowrap overflow-x-auto py-4 mx-2 flex flex-col justify-evenly">
                                <p >✉️ &nbsp;{session.user.email}</p>
                                <p>🎖️ &nbsp;{session.user.subscription ? `${t('subscribed_true')}` : `${t('subscribed_false')}`}</p>
                            </div>
                            <div className="mx-2 mb-2 flex justify-between gap-3">
                                <Link href={`/checkout`} onClick={() => setIsOpen(false)}
                                    className="w-full h-10 bg-slate-200 rounded flex justify-center items-center"
                                >
                                    {t('subscribe')}
                                </Link>
                                <button onClick={() => signOut({ redirect: true })}
                                    className="w-full h-10 bg-slate-200 rounded flex justify-center items-center"
                                >
                                    {t('logout')}
                                </button>
                            </div>
                        </div>
                    }
                </div>
            }
        </div >
    )
}
export default UserCard