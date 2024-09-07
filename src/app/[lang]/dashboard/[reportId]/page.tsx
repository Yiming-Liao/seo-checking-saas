// app/[lang]/dashboard/[reportId]/page.tsx
'use client'

import { useGetReport } from '@/services/useGetReport';
import ReportCard from '@/components/report/ReportCard';
const ReportPage = ({ params }: { params: { reportId: string } }) => {
    const { reportId } = params;

    const { data: report, error, isPending } = useGetReport(reportId);

    if (!report) return <div className="w-full h-96 flex justify-center items-center animate-bounce">Loading...</div>

    return (
        <ReportCard report={report} />
    );
};

export default ReportPage;
