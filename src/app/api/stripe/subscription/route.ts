// app/api/stripe/subscription/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';
import { stripe } from '@/lib/stripeClient';
import { getServerSession } from 'next-auth';

export async function POST() {
    const authSession = await getServerSession();  // 獲取 NextAuth session
    const email = authSession?.user.email;
    // 沒有email  // ✖️ 傳回前端 400 Bad Request
    if (!email) return NextResponse.json({ error: 'No email (Not loggin yet)' }, { status: 400 });

    try {
        // 從資料庫中查找用戶
        const userInDb = await prisma.subscribedUser.findUnique({
            where: { email },
        });

        if (!userInDb || !userInDb.stripeCustomerId) {
            // ✖️ 傳回前端 404 Not Found
            return NextResponse.json({ error: 'User or Stripe Customer ID not found' }, { status: 404 });
        }

        // 使用 Stripe 客戶 ID 查找訂閱
        const subscriptions = await stripe.subscriptions.list({
            customer: userInDb.stripeCustomerId,
            status: 'all', // 可以調整為 'active' 或 'incomplete'
        });

        // 訂閱資訊
        const subscription = subscriptions.data[0];

        // 找不到訂閱資訊返回預設值
        if (!subscription) return { status: false, remainingDays: 0 };

        // 是否訂閱中
        const status = subscription.status === 'active';

        // 計算剩餘天數
        const currentPeriodEnd = new Date(subscription.current_period_end * 1000);
        const today = new Date();
        const remainingDays = Math.ceil((currentPeriodEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        // 更新資料庫
        await prisma.subscribedUser.update({
            where: { stripeCustomerId: userInDb.stripeCustomerId },
            data: {
                subscription: status,
                remainingDays: remainingDays
            },
        });

        // ✔️ 傳回前端 200 OK   // status, remainingDays
        return NextResponse.json({ status, remainingDays }, { status: 200 });
    }

    // 錯誤處理
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error retrieving subscription:', error);
            // ✖️ 傳回前端 500 Internal Server Error
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            console.error('Unknown error:', error);
            // ✖️ 傳回前端 500 Internal Server Error
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}
