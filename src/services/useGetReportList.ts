import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getReportList = async () => {
    const response = await axios.get('/api/reports/get_report_list');
    return response.data.reports;
};

export const useGetReportList = () => {
    return useQuery({
        queryKey: ['reports'],
        queryFn: getReportList,
    });
};
