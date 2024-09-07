"use client"

import SeoChecker from '@/components/home/SeoChecker';
import { m_PLUS_Rounded_1c } from "@/app/fonts";
import { useTranslations } from 'next-intl';

export default function HomePage() {
    const t = useTranslations('Landing_Page');

    return (
        <main className='min-h-[calc(100vh-112px)] flex flex-col items-center gap-2'>
            <div className="container h-[800px] flex justify-evenly pt-48">
                <div className="flex justify-center">
                    <div className="flex flex-col items-center gap-16">
                        <h1 className={`${m_PLUS_Rounded_1c.className} text-8xl font-[700]`}>
                            {t('heading_1')}&nbsp;
                            <span className="drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">SEO </span>
                            {t('heading_2')}
                        </h1>
                        <SeoChecker />
                    </div>
                </div>

                {/* <div className="relative flex justify-center">
                    <Image src={"/images/hero.png"} width={9999} height={9999} alt={""} className="w-[500px]" />
                </div> */}
            </div>
        </main >
    )
}