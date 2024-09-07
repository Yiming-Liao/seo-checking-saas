import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/context/QueryProvider';

const deleteReport = async (reportId: string) => {
    const response = await axios.delete(`/api/reports/delete_report?reportId=${reportId}`);
    return response.data;
};

export const useDeleteReport = () => {
    return useMutation({
        mutationFn: deleteReport,
        onSuccess: () => {
            // 刪除成功後，重新加載報告列表
            queryClient.invalidateQueries({ queryKey: ['reports'] });
        },
    });
};
