// app/api/stripe/checkout/route.ts
import { prisma } from '@/lib/prismaClient';
import { stripe } from '@/lib/stripeClient';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function POST() {
    const authSession = await getServerSession();  // 獲取 NextAuth session
    const email = authSession?.user.email;
    // 沒有email  // ✖️ 傳回前端 400 Bad Request
    if (!email) return NextResponse.json({ error: 'No email (Not loggin yet)' }, { status: 400 });

    try {
        // 透過email搜尋使用者資料，檢查是否已經訂閱
        let userInDb = await prisma.subscribedUser.findUnique({ where: { email: email } });
        if (userInDb?.subscription) {
            // ✖️ 傳回前端 409 Conflict
            return NextResponse.json({ error: "User already subscribed." }, { status: 409 });
        }

        // 創建 Checkout Session
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            line_items: [
                {
                    price: "price_1PmAZYBvqGFk9xSkNZtYixr5", // 商品中的價格id
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.CLIENT_URL}/en/checkout?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/en/checkout`,
        });

        // session.url => 跳轉付款網址  // ✔️ 傳回前端 200 OK
        return NextResponse.json({ url: session.url });
    }
    // 錯誤處理:
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error creating checkout session:', error);
            // ✖️ 傳回前端 500 Internal Server Error
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            console.error('Unknown error:', error);
            // ✖️ 傳回前端 500 Internal Server Error
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}
