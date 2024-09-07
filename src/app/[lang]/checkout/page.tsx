"use client";

import { usePathname, useRouter } from '@/navigation';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PaymentPage = () => {
    const [customerId, setCustomerId] = useState<string | null>(null);

    // checkout
    const handleCheckout = async () => {
        try {
            const response = await axios.post('/api/stripe/checkout');
            // url => 跳轉付款網址 
            const { url } = response.data;
            if (url) window.location.href = url;
            else throw new Error('Failed to redirect to checkout page: URL not provided.');
        }
        // 錯誤處理
        catch (error) {
            axios.isAxiosError(error) && console.warn("❌", error.response?.data.error)
            console.error("Error: ", error);
        }
    };


    // 當前網址 .../en/checkout?session_id={CHECKOUT_SESSION_ID}`,
    const pathname = usePathname()
    const router = useRouter()
    // 用session_id訪問stripe獲取session
    useEffect(() => {
        const fetchSession = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const sessionId = urlParams.get('session_id');
            if (!sessionId) return;

            try {
                const response = await axios.post('/api/stripe/session', { session_id: sessionId });
                const { success, session } = response.data;

                if (success) {
                    setCustomerId(session.customer as string);
                    router.push(pathname) //清除網址的session_id
                }
            }
            // 錯誤處理
            catch (error) {
                axios.isAxiosError(error) && console.warn("❌", error.response?.data.error)
                console.error("Error: ", error);
            }
        };
        fetchSession();
    }, []);

    return (
        <div className='w-full min-h-96 flex flex-col justify-center items-center gap-8'>
            <h1>Subscribe to Our Service</h1>
            <button onClick={handleCheckout} className='border-4 p-4'>
                Subscribe Now
            </button>

            {customerId && (
                <div>
                    <h2>Payment Information</h2>
                    <p><strong>Customer ID:</strong> {customerId}</p>
                </div>
            )}
        </div>
    );
};

export default PaymentPage;
