// utils/guest/formatReport.ts

interface Reports {
    url: string;
    reportDesktop: any;
    reportMobile: any;
    reportDesktopCustom: any;
    reportMobileCustom: any;
}

export default function formatReport(reports: Reports) {
    const reportDesktop = reports.reportDesktop;
    const reportMobile = reports.reportMobile;

    // Desktop Audits
    // 性能的指標 (只有分數)
    const performanceMetricsDesktop = {
        performanceScore: reportDesktop?.categories?.performance?.score || 'N/A',
    };
    // 可及性指標 (只有分數)
    const accessibilityMetricsDesktop = {
        score: reportDesktop?.categories?.accessibility?.score || 'N/A',
    };
    // 最佳實踐指標 (只有分數)
    const bestPracticesMetricsDesktop = {
        score: reportDesktop?.categories?.["best-practices"]?.score || 'N/A',
    };
    // SEO 指標
    const seoMetricsDesktop = {
        score: reportDesktop?.categories?.seo?.score || 'N/A',
        httpStatusCode: reportDesktop?.audits['http-status-code']?.score === 1 || false,
        documentTitle: reportDesktop?.audits['document-title']?.score === 1 || false,
        metaDescription: reportDesktop?.audits['meta-description']?.score === 1 || false,
        linkText: reportDesktop?.audits['link-text']?.score === 1 || false,
        hreflangTags: reportDesktop?.audits['hreflang']?.score === 1 || false,
        canonicalLink: reportDesktop?.audits['canonical']?.score === 1 || false,
        fontSize: reportDesktop?.audits['font-size']?.score === 1 || false,

        isCrawlable: reportDesktop?.audits['is-crawlable']?.score === 1 || false, // do details
        crawlableAnchors: reportDesktop?.audits['crawlable-anchors']?.details?.items || "pass:[]",
        imageAlt: reportDesktop?.audits['image-alt']?.details?.items || "pass:[]",
        targetSize: reportDesktop?.audits['target-size']?.details?.items || "pass:[]",
    };
    // 畫面預覽
    const additionalMetricsDesktop = {
        screenshotThumbnail: reportDesktop?.audits['screenshot-thumbnails']?.details?.items[7]?.data || 'N/A',
    }


    // Desktop Audits
    // 處理桌面模式的指標 (只有分數)
    const performanceMetricsMobile = {
        performanceScore: reportMobile?.categories?.performance?.score || 'N/A',
    };
    // 可及性指標 (只有分數)
    const accessibilityMetricsMobile = {
        score: reportMobile?.categories?.accessibility?.score || 'N/A',
    };
    // 最佳實踐指標 (只有分數)
    const bestPracticesMetricsMobile = {
        score: reportMobile?.categories?.["best-practices"]?.score || 'N/A',
    };
    // SEO 指標
    const seoMetricsMobile = {
        score: reportMobile?.categories?.seo?.score || 'N/A',
        httpStatusCode: reportMobile?.audits['http-status-code']?.score === 1 || false,
        documentTitle: reportMobile?.audits['document-title']?.score === 1 || false,
        metaDescription: reportMobile?.audits['meta-description']?.score === 1 || false,
        linkText: reportMobile?.audits['link-text']?.score === 1 || false,
        hreflangTags: reportMobile?.audits['hreflang']?.score === 1 || false,
        canonicalLink: reportMobile?.audits['canonical']?.score === 1 || false,
        fontSize: reportMobile?.audits['font-size']?.score === 1 || false,

        isCrawlable: reportMobile?.audits['is-crawlable']?.score === 1 || false, // do details
        crawlableAnchors: reportMobile?.audits['crawlable-anchors']?.details?.items || "pass:[]",
        imageAlt: reportMobile?.audits['image-alt']?.details?.items || "pass:[]",
        targetSize: reportMobile?.audits['target-size']?.details?.items || "pass:[]",
    };
    // 畫面預覽
    const additionalMetricsMobile = {
        screenshotThumbnail: reportMobile?.audits['screenshot-thumbnails']?.details?.items[7]?.data || 'N/A',
    }


    // 集合結果 回傳前端
    return {
        reportInfo: {
            url: reports?.url,
        }
        ,
        desktop: {
            performance: performanceMetricsDesktop,
            accessibility: accessibilityMetricsDesktop,
            bestPractices: bestPracticesMetricsDesktop,
            seo: seoMetricsDesktop,
            additional: additionalMetricsDesktop
        },
        mobile: {
            performance: performanceMetricsMobile,
            accessibility: accessibilityMetricsMobile,
            seo: seoMetricsMobile,
            bestPractices: bestPracticesMetricsMobile,
            additional: additionalMetricsMobile
        },
        desktopCustom: reports.reportDesktopCustom,
        mobileCustom: reports.reportMobileCustom
    }
}


