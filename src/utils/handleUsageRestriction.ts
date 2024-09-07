import { prisma } from "@/lib/prismaClient";

export default async function handleUsageRestriction(userInDb: any, now: Date) {
    const lastUsingTime = userInDb.main_last_using_time;

    const elapsedHours = (now.getTime() - new Date(lastUsingTime).getTime()) / (1000 * 60 * 60);

    // ✖️ 等待時間小於 24 小時，不能使用功能，傳回 false
    if (elapsedHours < 24) return false;

    // 更新資料庫資料，然後啟動功能
    await prisma.user.update({
        where: { ip: userInDb.ip },
        data: { main_last_using_time: now },
    });

    // ✔️ 等待時間超過 24 小時，可以使用功能，傳回 true
    return true;
}