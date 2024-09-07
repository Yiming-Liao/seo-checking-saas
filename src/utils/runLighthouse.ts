// utils/runLighthouse.ts
import * as path from 'path';
import * as fs from 'fs';
import { spawn } from 'child_process';
import { prisma } from '@/lib/prismaClient';
import { getServerSession } from 'next-auth';
import runCustomCheck from '@/utils/customCheck/runCustomCheck';

export default async function runLighthouse(url: string) {
    // 取得當前登入會員 email
    const authSession = await getServerSession();  // 獲取 NextAuth session
    const email = authSession?.user.email || "";

    // 定義報告保存的根目錄，並根據 email 創建子目錄
    const reportsDir = path.join(process.cwd(), 'reports', email);

    // 如果目錄不存在，則創建目錄
    if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
    }

    // 定義桌面和手機模式報告的路徑
    const reportPathDesktop = path.join(reportsDir, 'report-desktop.json');
    const reportPathMobile = path.join(reportsDir, 'report-mobile.json');

    const options = { cwd: process.cwd(), shell: true };

    // 執行桌面模式的 Lighthouse 測試
    const lighthouseProcessDesktop = spawn('npx', ['lighthouse', url, '--output', 'json', '--output-path', reportPathDesktop, '--preset=desktop'], options);
    // 執行手機模式的 Lighthouse 測試
    const lighthouseProcessMobile = spawn('npx', ['lighthouse', url, '--output', 'json', '--output-path', reportPathMobile], options);

    try {
        // 等待兩個 Lighthouse 測試完成
        await Promise.all([
            // Desktop
            new Promise<void>((resolve, reject) => {
                lighthouseProcessDesktop.on('close', async (code) => {
                    if (code !== 0) {
                        console.error(`Desktop Lighthouse process failed with code ${code}`);
                        return reject(new Error('Desktop Lighthouse process failed'));
                    }
                    resolve();
                });

                lighthouseProcessDesktop.on('error', (error) => {
                    console.error('Desktop Lighthouse process error:', error);
                    reject(error);
                });
            }),
            // Mobile
            new Promise<void>((resolve, reject) => {
                lighthouseProcessMobile.on('close', (code) => {
                    if (code !== 0) {
                        console.error(`Mobile Lighthouse process failed with code ${code}`);
                        return reject(new Error('Mobile Lighthouse process failed'));
                    }
                    resolve();
                });

                lighthouseProcessMobile.on('error', (error) => {
                    console.error('Mobile Lighthouse process error:', error);
                    reject(error);
                });
            })
        ]);

        // 讀取 lighthouse 報告
        const reportDesktop = JSON.parse(fs.readFileSync(reportPathDesktop, 'utf8'));
        const reportMobile = JSON.parse(fs.readFileSync(reportPathMobile, 'utf8'));


        // 自訂報告
        let reportDesktopCustom = {};
        let reportMobileCustom = {};
        const result = await runCustomCheck(url);
        if (result) {
            const { desktop_basicTags, mobile_basicTags, desktop_ogTags, mobile_ogTags, desktop_twitterTags, mobile_twitterTags } = result;
            reportDesktopCustom = { desktop_basicTags, desktop_ogTags, desktop_twitterTags };
            reportMobileCustom = { mobile_basicTags, mobile_ogTags, mobile_twitterTags };
        }

        // 儲存報告到資料庫
        await prisma.lighthouseReport.create({
            data: {
                email,
                url,
                reportDesktop,
                reportMobile,
                reportDesktopCustom,
                reportMobileCustom
            },
        });


        // 刪除報告檔案
        fs.unlinkSync(reportPathDesktop);
        fs.unlinkSync(reportPathMobile);

        // ✔️ 報告產生完成，傳回
        return { url, reportDesktop, reportMobile, reportDesktopCustom, reportMobileCustom };
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
