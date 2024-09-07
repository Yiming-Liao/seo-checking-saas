// utils/runCustomCheck.ts
import getUrlData from '@/utils/customCheck/getUrlData';

export default async function runCustomCheck(url: string) {
    try {
        const urlData = await getUrlData(url);

        // 如果 urlData 為 false  // ✖️ 傳回 false
        if (!urlData) return false;

        const { desktop$, mobile$ } = urlData;

        //----------{ Basic Tags }----------//
        // meta charset
        const desktop_metaCharset = desktop$('meta[charset]').toArray().map(element => desktop$.html(element)).join('') || "";
        const mobile_metaCharset = mobile$('meta[charset]').toArray().map(element => mobile$.html(element)).join('') || "";
        // meta viewport
        const desktop_metaViewport = desktop$('meta[name="viewport"]').toArray().map(element => desktop$.html(element)).join('') || "";
        const mobile_metaViewport = mobile$('meta[name="viewport"]').toArray().map(element => mobile$.html(element)).join('') || "";
        // link canonical
        const desktop_canonical = desktop$('link[rel="canonical"]').toArray().map(element => desktop$.html(element)).join('') || "";
        const mobile_canonical = mobile$('link[rel="canonical"]').toArray().map(element => mobile$.html(element)).join('') || "";
        // title
        const desktop_title = desktop$('title').toArray().map(element => mobile$.html(element)).join('') || "";
        const mobile_title = mobile$('title').toArray().map(element => mobile$.html(element)).join('') || "";
        // description
        const desktop_metaDescription = desktop$('meta[name="description"]').toArray().map(element => mobile$.html(element)).join('') || "";
        const mobile_metaDescription = mobile$('meta[name="description"]').toArray().map(element => mobile$.html(element)).join('') || "";

        //----------{ Open Graph Tags }----------//
        // og:title
        const desktop_ogTitle = desktop$('meta[property="og:title"]').toArray().map(element => desktop$.html(element)).join('') || "";
        const mobile_ogTitle = mobile$('meta[property="og:title"]').toArray().map(element => mobile$.html(element)).join('') || "";
        // og:description
        const desktop_ogDescription = desktop$('meta[property="og:description"]').toArray().map(element => desktop$.html(element)).join('') || "";
        const mobile_ogDescription = mobile$('meta[property="og:description"]').toArray().map(element => mobile$.html(element)).join('') || "";
        // og:type
        const desktop_ogType = desktop$('meta[property="og:type"]').toArray().map(element => desktop$.html(element)).join('') || "";
        const mobile_ogType = mobile$('meta[property="og:type"]').toArray().map(element => mobile$.html(element)).join('') || "";
        // og:image
        const desktop_ogImage = desktop$('meta[property="og:image"]').toArray().map(element => desktop$.html(element)).join('') || "";
        const mobile_ogImage = mobile$('meta[property="og:image"]').toArray().map(element => mobile$.html(element)).join('') || "";
        // og:url
        const desktop_ogUrl = desktop$('meta[property="og:url"]').toArray().map(element => desktop$.html(element)).join('') || "";
        const mobile_ogUrl = mobile$('meta[property="og:url"]').toArray().map(element => mobile$.html(element)).join('') || "";
        // og:site_name
        const desktop_ogSiteName = desktop$('meta[property="og:site_name"]').toArray().map(element => desktop$.html(element)).join('') || "";
        const mobile_ogSiteName = mobile$('meta[property="og:site_name"]').toArray().map(element => mobile$.html(element)).join('') || "";

        //----------{ Open Graph Tags }----------//
        // twitter:card
        const desktop_twitterCard = desktop$('meta[name="twitter:card"]').toArray().map(element => desktop$.html(element)).join('') || "";
        const mobile_twitterCard = mobile$('meta[name="twitter:card"]').toArray().map(element => mobile$.html(element)).join('') || "";
        // twitter:title
        const desktop_twitterTitle = desktop$('meta[name="twitter:title"]').toArray().map(element => desktop$.html(element)).join('') || "";
        const mobile_twitterTitle = mobile$('meta[name="twitter:title"]').toArray().map(element => mobile$.html(element)).join('') || "";
        // twitter:description
        const desktop_twitterDescription = desktop$('meta[name="twitter:description"]').toArray().map(element => desktop$.html(element)).join('') || "";
        const mobile_twitterDescription = mobile$('meta[name="twitter:description"]').toArray().map(element => mobile$.html(element)).join('') || "";
        // twitter:image
        const desktop_twitterImage = desktop$('meta[name="twitter:image"]').toArray().map(element => desktop$.html(element)).join('') || "";
        const mobile_twitterImage = mobile$('meta[name="twitter:image"]').toArray().map(element => mobile$.html(element)).join('') || "";
        // twitter:image:alt
        const desktop_twitterImageAlt = desktop$('meta[name="twitter:image:alt"]').toArray().map(element => desktop$.html(element)).join('') || "";
        const mobile_twitterImageAlt = mobile$('meta[name="twitter:image:alt"]').toArray().map(element => mobile$.html(element)).join('') || "";

        const desktop_basicTags = {
            desktop_metaCharset,
            desktop_metaViewport,
            desktop_canonical,
            desktop_title,
            desktop_metaDescription,
        }
        const mobile_basicTags = {
            mobile_metaCharset,
            mobile_metaViewport,
            mobile_canonical,
            mobile_title,
            mobile_metaDescription
        }
        const desktop_ogTags = {
            desktop_ogTitle,
            desktop_ogDescription,
            desktop_ogType,
            desktop_ogImage,
            desktop_ogUrl,
            desktop_ogSiteName,
        }
        const mobile_ogTags = {
            mobile_ogTitle,
            mobile_ogDescription,
            mobile_ogType,
            mobile_ogImage,
            mobile_ogUrl,
            mobile_ogSiteName
        }
        const desktop_twitterTags = {
            desktop_twitterCard,
            desktop_twitterTitle,
            desktop_twitterDescription,
            desktop_twitterImage,
            desktop_twitterImageAlt,
        }
        const mobile_twitterTags = {
            mobile_twitterCard,
            mobile_twitterTitle,
            mobile_twitterDescription,
            mobile_twitterImage,
            mobile_twitterImageAlt
        }

        // 返回電腦版和手機版的標題
        return { desktop_basicTags, mobile_basicTags, desktop_ogTags, mobile_ogTags, desktop_twitterTags, mobile_twitterTags };
    }
    // 錯誤處理
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Unexpected error:', error);
        } else {
            console.error('Unexpected error type:', error);
        }
        // ✖️ 沒有完成，出現錯誤，傳回 false
        return false;
    }
}
