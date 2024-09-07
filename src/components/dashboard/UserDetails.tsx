import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const UserDetails = () => {
    const { data: session, update } = useSession();
    const [subscription, setSubscription] = useState<{ status: boolean, remainingDays: number } | null>(null);

    const getSubscriptionStatus = async () => {
        try {
            const response = await axios.post("/api/stripe/subscription");
            setSubscription(response.data)
            await update(); // 更新 session
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.warn(error.response?.data.error)
                console.error(error)
            } else console.error("Unknown Error.")
        }
    }

    useEffect(() => {
        getSubscriptionStatus();
    }, [])



    return (
        <div>
            <div className="flex">
                {session &&
                    <div className="flex">
                        <div>
                            <p>name: {session.user.name}</p>
                            <p>email: {session.user.email}</p>
                            <p>訂閱: {session.user.subscription ? "true" : "false"}</p>
                            {subscription &&
                                <p>{subscription.status ? "active" : "Inactive"} {subscription.remainingDays}</p>
                            }

                        </div>
                        <Image src={session?.user.image} alt="" width={80} height={80} priority={true} />
                    </div>
                }
                {session && <button onClick={() => signOut({ redirect: true })}>Sign Out</button>}
            </div>
        </div>
    )
}
export default UserDetails