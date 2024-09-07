// app/api/reports/get_report_list
import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {

    // 取得當前登入會員 email，若無登入則用ip
    const authSession = await getServerSession();  // 獲取 NextAuth session
    const email = authSession?.user.email || "";

    try {
        const reports = await prisma.lighthouseReport.findMany({
            where: { email: email },
            select: {
                id: true,
                url: true,
                reportDesktop: true,
                reportMobile: true,
                createdAt: true
            }
        });
        
        // ✔️ 傳回前端 200 OK
        return NextResponse.json({ reports }, { status: 200 })
    }

    // 錯誤處理:
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error:', error);
            // ✖️ 傳回前端 500 Internal Server Error
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            console.error('Unknown error:', error);
            // ✖️ 傳回前端 500 Internal Server Error
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}