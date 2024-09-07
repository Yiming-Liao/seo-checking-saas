import AccessibilityChart from "@/components/report/charts/AccessibilityChart";
import BestPracticesChart from "@/components/report/charts/BestPracticesChart";
import PerformanceChart from "@/components/report/charts/PerformanceChart";
import ReportDetails from "@/components/report/ReportDetails";
import SeoChart from "@/components/report/charts/SeoChart";
import Image from "next/image";
import { useState } from "react";
import { Laptop, Smartphone } from 'lucide-react';
import { useTranslations } from "next-intl";

const ReportCard = ({ report }: any) => {
    const t = useTranslations('Report');

    const [isDesktop, setIsDesktop] = useState(true);

    return (
        <main className='min-h-[calc(100vh-112px)] flex flex-col items-center gap-2'>
            <div className="container h-[800px]">
                <div className='border-4 rounded-lg p-4 mt-8 flex flex-col gap-4'>
                    {/* 主要標題 */}
                    <div className="flex justify-between items-center gap-4">
                        <p>{t('thanks_for_using')}</p>
                        {/* 目標網址 */}
                        <div className='flex items-center gap-4'>
                            <h1 className="text-lg">{t('target_url')}:</h1>
                            <div className="w-max h-8 text-lg bg-primary rounded-md px-3 flex justify-center items-center gap-2">
                                <a href={report.reportInfo.url} target="_blank" rel="noopener" className="text-white font-semibold h-min">{report.reportInfo.url}</a>
                            </div>
                        </div>
                    </div>

                    {/* 電腦 手機 Tabs */}
                    <div className="h-12 flex gap-8">
                        <button onClick={() => setIsDesktop(true)}
                            className="w-1/2 border-2 border-gray-300 hover:shadow-[rgba(0,_0,_0,_0.24)_0px_1px_8px] rounded-md flex justify-center items-center">
                            <Laptop />
                        </button>
                        <button onClick={() => setIsDesktop(false)}
                            className="w-1/2 border-2 border-gray-300 hover:shadow-[rgba(0,_0,_0,_0.24)_0px_1px_8px] rounded-md flex justify-center items-center">
                            <Smartphone />
                        </button>
                    </div>


                    {/* Desktop */}
                    <div className={`p-2 ${isDesktop ? "" : "hidden"}`}>
                        <div className="flex flex-col">

                            <div className="flex justify-evenly items-center gap-4">

                                {/* SEO Chart */}
                                <SeoChart report={report.desktop} />

                                {/* Charts */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex gap-4">
                                        <PerformanceChart report={report.desktop} />
                                        <AccessibilityChart report={report.desktop} />
                                        <BestPracticesChart report={report.desktop} />
                                    </div>
                                    <div>
                                        <p>{t('get_full_report')}</p>
                                        <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener" className="text-gray-600 font-semibold">pagespeed.web.dev</a>
                                    </div>
                                </div>

                                {/* 預覽圖 */}
                                <div className="w-96 h-64 border-4 border-accent/50 rounded-xl p-1">
                                    <Image src={report.desktop.additional.screenshotThumbnail} alt="" width={384} height={256} className='size-full rounded-md' />
                                </div>

                            </div>
                        </div>

                        <div className="mt-4">
                            {/* 報告細節report */}
                            <ReportDetails report={report} isDesktop={true} />
                        </div>
                    </div>

                    {/* Mobile */}
                    <div className={`p-2 ${!isDesktop ? "" : "hidden"}`}>
                        <div className="flex flex-col">
                            <div className="flex justify-evenly items-center gap-4">
                                {/* SEO Chart */}
                                <SeoChart report={report.mobile} />

                                {/* Charts */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex gap-4">
                                        <PerformanceChart report={report.mobile} />
                                        <AccessibilityChart report={report.mobile} />
                                        <BestPracticesChart report={report.mobile} />
                                    </div>
                                    <div>
                                        <p>{t('get_full_report')}</p>
                                        <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener" className="text-gray-600 font-semibold">pagespeed.web.dev</a>
                                    </div>
                                </div>

                                {/* 預覽圖 */}
                                <div className="w-96 h-64 border-4 border-accent/50 rounded-xl p-1 flex justify-center items-center">
                                    <Image src={report.mobile.additional.screenshotThumbnail} alt="" width={384} height={256} className='w-min h-full object-contain rounded-md border-2' />
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            {/* 報告細節report */}
                            <ReportDetails report={report} isDesktop={false} />
                        </div>
                    </div>

                    {/* Mobile */}
                    <div className={`p-2 ${!isDesktop ? "" : "hidden"}`}>

                        <p>fontSize: {report?.mobile?.seo?.fontSize ? '✅' : '❌'}</p>


                        <div>targetSize: {report?.mobile?.seo?.targetSize ? (
                            report?.mobile?.seo?.targetSize.map((badElements: TargetSize, index: number) => (
                                <div key={index} className='mx-16 w-max'>
                                    ❌ {index + 1}. {badElements.node.snippet}
                                    <div className='flex w-max'>
                                        {badElements.subItems.items.map((subItem, index) => (
                                            <div key={index} className='mx-16'>
                                                {`(`}{index + 1}{`)`} {subItem.relatedNode.snippet}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : '?'}</div>



                    </div>




                </div>
            </div>
        </main>
    )
}
export default ReportCard;


interface Node {
    snippet: string;
}

interface SubItem {
    relatedNode: Node;
}

interface TargetSize {
    node: Node;
    subItems: {
        items: SubItem[];
    };
}

interface SeoReport {
    fontSize: boolean;
    targetSize: TargetSize[] | null;
}

interface MobileReport {
    seo: SeoReport;
}
