import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getReport = async (reportId) => {
    const response = await axios.get(`/api/reports/get_report_details?reportId=${reportId}`);
    console.log(`Here: ${response.data.reportInfo}`);

    // 確保回傳資料正確存在
    if (response.data) {
        return response.data; // 回傳整個資料結構
    } else {
        throw new Error('Report data not found');
    }
};

export const useGetReport = (reportId) => {
    return useQuery({
        queryKey: ['report', reportId],
        queryFn: () => getReport(reportId),
    });
};
