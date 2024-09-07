import { useRouter } from "@/navigation";
import axios from "axios";
import { useState } from "react";

const SeoChecker = () => {
    const [inputUrl, setInputUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const router = useRouter(); // 初始化 router

    const handleSeoCheck = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post("/api/seo-check", { url: inputUrl });
            console.log(response.data.message);
            console.log(response.data.result);

            localStorage.setItem('seo-report', JSON.stringify(response.data.result));

            // 跳轉到 result 頁面
            router.push('/result');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.warn(error.response?.data.error);
                setError(error.response?.data.error);
                console.error(error);
            } else console.error("Unknown Error.")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {isLoading ? (
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full animate-spin bg-gradient-to-br from-accent/20 to-stone-600"></div>
                    <div className="w-96 h-16 font-[500] text-xl bg-secondary rounded-lg px-8 flex justify-center items-center">
                        Scanning... Please wait...
                    </div>
                </div>
            ) : (
                <div className="flex gap-4">
                    <input type="url" required placeholder="輸入URL" value={inputUrl}
                        onChange={e => setInputUrl(e.target.value)}
                        className="w-96 h-16 border-2 border-secondary rounded-lg px-8"
                    />
                    <button onClick={handleSeoCheck} disabled={isLoading}
                        className="w-28 h-16 bg-primary text-white rounded-lg shadow-md">
                        SEO UP!
                    </button>
                </div>)}

            <p className="text-rose-700">{error}</p>
        </>
    )
}
export default SeoChecker;