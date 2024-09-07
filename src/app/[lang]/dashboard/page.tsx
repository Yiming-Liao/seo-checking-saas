"use client";

import UserDetails from "@/components/dashboard/UserDetails";
import { Link } from "@/navigation";
import Image from "next/image";
import formatDate from "@/utils/formatDate";
import { useDeleteReport } from "@/services/useDeleteReport";
import { useGetReportList } from "@/services/useGetReportList";
import { useState } from "react";
import { useTranslations } from "next-intl";

const DashboardPage = () => {
    const { data: reports, error, isPending } = useGetReportList();
    const t = useTranslations('Dashboard');

    const { mutate, isPending: isDeletePending, error: deleteError } = useDeleteReport();

    const [pedingId, setPedingId] = useState("");

    const handleDelete = (reportId: string) => {
        if (!confirm("Are you sure to delete this report?")) return;
        setPedingId(reportId);
        mutate(reportId);
    };


    isPending && <div className="w-full h-96 flex justify-center items-center animate-pulse">Loading...</div>
    error && <div>Failed to load reports</div>
    deleteError && <div>Failed to delete the report</div>

    if (!reports) return <div className="w-full h-96 flex justify-center items-center animate-bounce">Loading...</div>


    console.log(reports)


    return (
        <main className='min-h-[calc(100vh-112px)] flex flex-col items-center gap-2'>
            <div className="container h-[800px] flex justify-evenly">
                {/* <UserDetails /> */}
                <div className="p-8 flex flex-col gap-8">
                    <h1 className="text-4xl">Reports 報告紀錄</h1>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {reports && reports.map((report: Report) => (
                            // 每個報告
                            <div key={report.id} className={`relative w-64 h-auto bg-white border-2 rounded-md hoverBoxShadow duration-200
                                                            ${isDeletePending && pedingId === report.id ? "opacity-50" : ""}`}>
                                <Link href={`/dashboard/${report.id}`} className="w-full h-auto p-4 flex flex-col">
                                    <div className="min-h-32 flex flex-col justify-between">
                                        <div className="flex justify-between">
                                            <p>📍 {report.id}</p>
                                            <p>{formatDate(report.createdAt)}</p>
                                        </div>
                                        <div className="min-h-16 flex gap-[6px]">
                                            🌐
                                            <p className="break-all">{report.url}</p>
                                        </div>
                                    </div>
                                    {/* 預覽圖 */}
                                    {report?.reportDesktop &&
                                        <Image src={report.reportDesktop.audits['screenshot-thumbnails']?.details?.items[7]?.data}
                                            alt="" width={300} height={300}
                                            className='w-full border border-secondary/50 rounded'
                                        />}
                                </Link>
                                {/* 刪除按鈕 */}
                                <button onClick={() => handleDelete(report.id)} className="w-16 h-8 bg-red-600 text-white rounded-md m-2">
                                    {t("delete")}
                                </button>

                                {/* Loading */}
                                <div className={`${isDeletePending && pedingId === report.id ? "" : "hidden"} absolute top-[50%] translate-y-[-50%] right-[50%] translate-x-[50%] `}>
                                    <Image src={'/images/loading.svg'} alt="" width={300} height={300}
                                        className='size-24 opacity-50 animate-spin'
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;


// Types
interface Report {
    id: string;
    createdAt: string;
    url: string;
    reportDesktop: {
        audits: {
            'screenshot-thumbnails': {
                details: {
                    items: {
                        data: string
                    }[]
                }
            }
        }
    }
}