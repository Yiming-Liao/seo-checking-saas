// utils/verifyUrl.ts
export default function verifyURL(url: string): boolean {
    try {
        const parsedUrl = new URL(url);
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
            console.error('Invalid URL scheme. Only http and https are allowed.');
            return false;
        }
        return true;
    } catch (error) {
        console.error('Invalid URL format:', error);
        return false;
    }
}
