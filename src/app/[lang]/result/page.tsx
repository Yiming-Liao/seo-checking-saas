"use client"

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import ReportCard from "@/components/report/ReportCard";


const ResultPage = () => {
    const t = useTranslations('Report');

    const [report, setReport] = useState<any>(null);
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        // 從 localStorage 讀取資料
        const seoReport = localStorage.getItem('seo-report');

        if (seoReport && seoReport !== "undefined") {
            setReport(JSON.parse(seoReport));
        }

    }, []); // 空的依賴數組表示只在組件首次掛載時執行


    if (!report) return <div className="w-full h-96 flex justify-center items-center animate-bounce">Loading...</div>

    return (
        <ReportCard report={report} />
    )
}
export default ResultPage;