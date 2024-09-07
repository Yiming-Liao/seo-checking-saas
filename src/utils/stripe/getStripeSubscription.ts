// src/lib/getStripeSubscription.ts
import { stripe } from '@/lib/stripeClient';

export default async function getStripeSubscription(customerId: string) {
    try {
        // 用 customerId 訪問 stripe 取得訂閱資訊
        const subscriptions = await stripe.subscriptions.list({
            customer: customerId,
            status: 'all',
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

        // ✔️ 傳回 status, remainingDays
        return { status, remainingDays };
    }

    // 錯誤處理
    catch (error) {
        console.error('Error fetching subscription:', error);
        // 錯誤發生時返回預設值
        return { status: false, remainingDays: 0 };
    }
}
