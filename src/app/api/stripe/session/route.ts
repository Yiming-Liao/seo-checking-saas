// app/api/stripe/session/route.ts
import { prisma } from '@/lib/prismaClient';
import { stripe } from '@/lib/stripeClient';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
    const { session_id }: { session_id: string } = await request.json(); // 從請求體中提取 session_id
    // 沒有session_id  // ✖️ 傳回前端 400 Bad Request
    if (!session_id) return NextResponse.json({ error: 'No session_id' }, { status: 400 });

    const authSession = await getServerSession();  // 獲取 NextAuth session
    const email = authSession?.user.email;
    // 沒有email  // ✖️ 傳回前端 400 Bad Request
    if (!email) return NextResponse.json({ error: 'No email (Not loggin yet)' }, { status: 400 });

    try {
        // 用 session_id 到 stripe 取回資訊
        const session = await stripe.checkout.sessions.retrieve(session_id);

        // 付款未完成  
        if (session.payment_status !== 'paid' && session.status !== 'complete') {
            // ✖️ 傳回前端 400 Bad Request
            return NextResponse.json({ error: 'Payment not completed.' }, { status: 400 });
        }


        // ✅付款完成!

        await prisma.subscribedUser.upsert({
            where: { email: email },
            update: {
                stripeCustomerId: session.customer as string,
                subscription: true,
            },
            create: {
                email: email,
                stripeCustomerId: session.customer as string,
                subscription: true,
                remainingDays: 0,
                createdAt: new Date(),
            },
        });

        return NextResponse.json({ session });
    }

    // 錯誤處理:
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error retrieving session:', error);
            // ✖️ 傳回前端 500 Internal Server Error
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            console.error('Unknown error:', error);
            // ✖️ 傳回前端 500 Internal Server Error
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}