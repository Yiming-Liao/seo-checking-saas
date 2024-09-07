import NextAuth, { Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/lib/prismaClient';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,    // Google 客戶端 ID
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // Google 客戶端密鑰
        }),
    ],
    callbacks: {
        // session
        async session({ session }: { session: Session }) {

            // 查詢資料庫以獲取訂閱狀態
            const userInDb = await prisma.subscribedUser.findUnique({
                where: { email: session.user.email || '' },
                select: { subscription: true },
            });

            session.user = {
                ...session.user,
                subscription: userInDb?.subscription || false, // 添加訂閱狀態到 session 中
            }

            return session; // 回傳更新後的 session
        },
        async signIn() {
            return true; // 允許所有用戶登入
        },
    },
    // cookie
    cookies: {
        sessionToken: {
            name: 'next-auth.session-token',  // Cookie 的名稱
            options: {
                httpOnly: true, // 確保 Cookie 僅能由伺服器讀取
                secure: process.env.NODE_ENV === 'production', // 僅在生產環境中使用安全的 Cookie
                sameSite: 'lax', // 設定 Cookie 的 SameSite 屬性
                path: '/', // 設定 Cookie 的路徑
            },
        },
    },
    // 取消登入會跳轉到error頁面
    pages: {
        signIn: '/', // 自定義登入頁面 URL
        error: '/', // 錯誤頁面 URL，例如錯誤代碼會傳遞在 query string 中
    },
    secret: process.env.NEXTAUTH_SECRET, // NextAuth 的密鑰
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; // 匯出 GET 和 POST 方法處理登入


// 擴充 Session 型別，添加自定義屬性
declare module 'next-auth' {
    interface Session {
        user: {
            name: string;
            image: string | StaticImport;
            email: string;
            subscription?: boolean; // 用戶是否訂閱的狀態
        };
    }
}