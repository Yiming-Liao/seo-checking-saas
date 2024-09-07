// app/api/reports/[reportId]/delete.ts
import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    // 取得當前登入會員的 email
    const authSession = await getServerSession();
    const email = authSession?.user.email || "";

    const { searchParams } = new URL(request.url);
    const reportId = Number(searchParams.get('reportId'));
    // console.log(reportId)

    try {
        // 確認該報告屬於當前使用者
        const report = await prisma.lighthouseReport.findUnique({
            where: {
                id: reportId,
                email: email,
            },
        });

        if (!report) {
            return NextResponse.json({ message: "報告不存在或無權限刪除" }, { status: 404 });
        }

        // 刪除該報告
        await prisma.lighthouseReport.delete({
            where: { id: reportId },
        });

        // ✔️ 傳回前端 200 OK
        return NextResponse.json({ message: "報告已刪除" }, { status: 200 });
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
