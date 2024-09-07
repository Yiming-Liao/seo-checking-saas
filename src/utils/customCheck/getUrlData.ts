// utils/getUrlData.ts
import axios from "axios";
import { load } from 'cheerio';

export default async function getUrlData(url: string) {
    try {
        // 設定 User-Agent 來模擬桌面版訪問
        const desktopResponse = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' } });
        const desktop$ = load(desktopResponse.data);

        // 設定 User-Agent 來模擬手機版訪問
        const mobileResponse = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1' } });
        const mobile$ = load(mobileResponse.data);

        return { desktop$, mobile$ };
    }
    // 錯誤處理
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Unexpected error:', error);
        } else {
            console.error('Unexpected error type:', error);
        }
        // ✖️ 沒有完成，出現錯誤，傳回 false
        return false;
    }
}
