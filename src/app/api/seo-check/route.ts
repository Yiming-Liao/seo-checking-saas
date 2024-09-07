// app/api/seo-check/route.ts
import { prisma } from '@/lib/prismaClient';
import { NextResponse } from 'next/server';
import getStripeSubscription from '@/utils/stripe/getStripeSubscription';
import handleUsageRestriction from '@/utils/handleUsageRestriction';
import runLighthouse from '@/utils/runLighthouse';
import { getServerSession } from 'next-auth';
import verifyURL from '@/utils/verifyUrl';
import runLighthouseGuest from '@/utils/guest/runLighthouseGuest';
import formatReport from '@/utils/guest/formatReport';

export async function POST(request: Request) {
    const { url } = await request.json();
    console.log(`要檢查的網址: `, url)

    // 檢查是否為 valid URL  // ✖️ 回傳 400 Bad Request
    if (!verifyURL(url)) { return NextResponse.json({ error: 'Invalid URL format or scheme.' }, { status: 400 }); }

    // 取得當前登入會員 email，若無登入則用ip
    const authSession = await getServerSession();  // 獲取 NextAuth session
    const email = authSession?.user.email || "";

    // 獲取請求的標頭中的 IP 地址
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : request.headers.get('x-real-ip') || 'IP not found';
    console.log('此客戶端連線的ip位址: ', ip);
    // const ip = "123456789"

    // 獲取當前時間，用來計算能否使用功能
    const now = new Date();

    try {

        // 🪣 User 中資料  // 透過 ip 查找
        const userInUser = await prisma.user.findUnique({
            where: { ip: ip },
        });

        // 🪣 SubscribedUser 中資料  // 透過 email 查找
        const userInSubscribedUser = await prisma.subscribedUser.findUnique({
            where: { email: email },
        });


        // SubscribedUser 中沒有此 email 的訂閱用戶 || 目前沒有登入用戶，沒有 email 可以查找
        if (!userInSubscribedUser) {  // email 為 null || 查找後為 null

            // 目前沒有登入，且該 ip 不存在，建立一筆新資料
            if (!userInUser) {
                await prisma.user.create({
                    data: {
                        ip: ip,
                        main_last_using_time: now,
                    },
                });

                //.....第一次使用，🚀啟動功能
                const reports = await runLighthouseGuest(url);
                const result = formatReport(reports as any);

                return NextResponse.json({ result, message: "(1. 未訂閱|IP不存在)🚀🚀🚀" }, { status: 200 });
            }
            // 已存在，檢查是否超過24小時
            if (await handleUsageRestriction(userInUser, now)) {
                //.....已超過24小時🚀啟動功能
                const reports = await runLighthouseGuest(url);
                const result = formatReport(reports as any);

                return NextResponse.json({ result, message: "(2. 未訂閱|IP已存在|已超過24小時)🚀🚀🚀" }, { status: 200 });
            } else {
                // ✖️ 傳回前端 403 Forbidden
                return NextResponse.json({ error: 'You can only use this feature once every 24 hours.' }, { status: 403 });
            }
        }

        // SubscribedUser 中有 email 的訂閱用戶
        else {
            if (!userInSubscribedUser.stripeCustomerId) {
                // ✖️ 傳回前端 404 Not Found
                return NextResponse.json({ error: 'Unexpected error occurred, stripeCustomerId not exist.' }, { status: 404 });
            }
            // 再次訪問stripe檢查訂閱狀態  // 使用getStripeSubscription來取得資訊
            const { status, remainingDays } = await getStripeSubscription(userInSubscribedUser?.stripeCustomerId);
            console.log('Subscription Status:', status, 'Remaining Days:', remainingDays);

            // 再次確認後發現沒有訂閱，且超過最後訂閱之可使用時間
            if (!status && remainingDays < 1) {
                // 同一般會員操作，檢查是否超過24小時
                if (await handleUsageRestriction(userInUser, now)) {
                    //.....已超過24小時🚀啟動功能
                    const reports = await runLighthouseGuest(url);
                    const result = formatReport(reports as any);

                    return NextResponse.json({ result, message: "(3 未訂閱(曾訂閱過)|IP已存在|已超過24小時)🚀🚀🚀" }, { status: 200 });
                } else {
                    // ✖️ 傳回前端 403 Forbidden
                    return NextResponse.json({ error: 'You can only use this feature once every 24 hours.' }, { status: 403 });
                }
            }



            // 有訂閱，可以啟動
            const reports = await runLighthouse(url);
            const result = formatReport(reports as any);

            // ✔️ 傳回前端 200 OK
            return NextResponse.json({ result, message: "(4 有訂閱)🚀🚀🚀" }, { status: 200 });
        }
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

