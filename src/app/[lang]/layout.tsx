import type { Metadata } from "next";
import "@/app/globals.css";
import NextIntlProvider from "@/context/NextIntlProvider";
import AuthProvider from "@/context/AuthProvider";
import Navbar from "@/components/layout/Navbar";
import { m_PLUS_Rounded_1c } from "@/app/fonts";
import QueryProvider from "@/context/QueryProvider";

export const metadata: Metadata = {
    title: "SEO UP",
    description: "Generated by create next app",
    alternates: {
        canonical: './',
    }
};

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    return (
        <html lang={locale}>
            <body className={`${m_PLUS_Rounded_1c.className}`}>
                <QueryProvider>
                    <NextIntlProvider>
                        <AuthProvider>
                            <Navbar />
                            <div className="w-full h-24 invisible"></div> {/*撐高度*/}
                            {children}
                        </AuthProvider>
                    </NextIntlProvider>
                </QueryProvider>
            </body>
        </html>
    );
}