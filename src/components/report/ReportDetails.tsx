import { useTranslations } from "next-intl";
import Accordion from "./Accordion"

const ReportDetails = ({ report, isDesktop }: any) => {
    const t = useTranslations('ReportDetails');

    const platform = isDesktop ? "desktop" : "mobile";

    const {
        ogTitle,
        ogDescription,
        ogType,
        ogImage,
        ogUrl,
        ogSiteName
    } = report[`${platform}Custom`][`${platform}_ogTags`];
    const hasAllOgTags = [ogTitle, ogDescription, ogType, ogImage, ogUrl, ogSiteName].every(Boolean);

    const {
        twitterCard,
        twitterTitle,
        twitterDescription,
        twitterImage,
        twitterImageAlt
    } = report[`${platform}Custom`][`${platform}_twitterTags`];
    const hasAllTwitterTags = [twitterCard, twitterTitle, twitterDescription, twitterImage, twitterImageAlt].every(Boolean);

    return (
        <div className="flex flex-col gap-4">
            {/* Http Status Code */}
            <Accordion
                head={
                    <div className="w-full border-4 p-4 rounded-lg flex justify-between items-start gap-24 group">
                        <p className="group-hover:opacity-75 duration-75">{report[`${platform}`].seo.httpStatusCode ? '✅' : '❌'} Http Status Code</p>
                        <a href="https://developer.chrome.com/docs/lighthouse/seo/http-status-code/" target="_blank" rel="noopener">
                            Read the doc: 🌐 Link
                        </a>
                    </div>
                }
                body={
                    <div className="w-full border-4 border-t-0 p-4 rounded-lg flex justify-between gap-8">
                        <p>{report[`${platform}`].seo.httpStatusCode ? '200 OK' : '❌'}</p>
                        <p className="w-1/5 min-w-36">{t("http_status_code")}</p>
                    </div>
                }
            />


            <h2>Basic Tags</h2>
            {/* Meta Charset */}
            <Accordion
                head={
                    <div className="w-full border-4 p-4 rounded-lg flex justify-between items-start gap-24 group">
                        <p className="group-hover:opacity-75 duration-75">{report[`${platform}Custom`][`${platform}_basicTags`][`${platform}_metaCharset`] ? '✅' : '❌'} Meta Charset</p>
                        <a href="https://developer.chrome.com/docs/lighthouse/best-practices/charset/" target="_blank" rel="noopener">
                            🌐 Link
                        </a>
                    </div>
                }
                body={
                    <div className="w-full border-4 border-t-0 p-4 rounded-lg flex justify-between gap-8">
                        <p>{report[`${platform}Custom`][`${platform}_basicTags`][`${platform}_metaCharset`]}</p>
                        <p className="w-1/5 min-w-36">{t("meta_charset")}</p>
                    </div>
                }
            />

            {/* Meta Viewport */}
            <Accordion
                head={
                    <div className="w-full border-4 p-4 rounded-lg flex justify-between items-start gap-24 group">
                        <p className="group-hover:opacity-75 duration-75">{report[`${platform}Custom`][`${platform}_basicTags`][`${platform}_metaViewport`] ? '✅' : '❌'} Meta Viewport</p>
                        <a href="https://dequeuniversity.com/rules/axe/4.9/meta-viewport" target="_blank" rel="noopener">
                            🌐 Link
                        </a>
                    </div>
                }
                body={
                    <div className="w-full border-4 border-t-0 p-4 rounded-lg flex justify-between gap-8">
                        <p>{report[`${platform}Custom`][`${platform}_basicTags`][`${platform}_metaViewport`]}</p>
                        <p className="w-1/5 min-w-36"> {t("meta_viewport")}</p>
                    </div>
                }
            />

            {/* Link Canonical */}
            <Accordion
                head={
                    <div className="w-full border-4 p-4 rounded-lg flex justify-between items-start gap-24 group">
                        <p className="group-hover:opacity-75 duration-75">{report[`${platform}`].seo.canonicalLink ? '✅' : '❌'} Link Canonical</p>
                        <a href="https://developer.chrome.com/docs/lighthouse/seo/canonical/" target="_blank" rel="noopener">
                            🌐 Link
                        </a>
                    </div>
                }
                body={
                    <div className="w-full border-4 border-t-0 p-4 rounded-lg flex justify-between gap-8">
                        <p>{report[`${platform}Custom`][`${platform}_basicTags`][`${platform}_canonical`]}</p>
                        <p className="w-1/5 min-w-36"> {t("link_canonical")}</p>
                    </div>
                }
            />

            {/* Title */}
            <Accordion
                head={
                    <div className="w-full border-4 p-4 rounded-lg flex justify-between items-start gap-24 group">
                        <p className="group-hover:opacity-75 duration-75">{report[`${platform}`].seo.documentTitle ? '✅' : '❌'} Document Title</p>
                        <a href="https://dequeuniversity.com/rules/axe/4.9/document-title" target="_blank" rel="noopener">
                            🌐 Link
                        </a>
                    </div>
                }
                body={
                    <div className="w-full border-4 border-t-0 p-4 rounded-lg flex justify-between gap-8">
                        <p>{report[`${platform}Custom`][`${platform}_basicTags`][`${platform}_title`]}</p>
                        <p className="w-1/5 min-w-36">{t("document_title")}</p>
                    </div>
                }
            />

            {/* metaDescription */}
            <Accordion
                head={
                    <div className="w-full border-4 p-4 rounded-lg flex justify-between items-start gap-24 group">
                        <p className="group-hover:opacity-75 duration-75">{report[`${platform}`].seo.metaDescription ? '✅' : '❌'} Meta Description</p>
                        <a href="https://developer.chrome.com/docs/lighthouse/seo/meta-description?hl=zh-tw" target="_blank" rel="noopener">
                            🌐 Link
                        </a>
                    </div>
                }
                body={
                    <div className="w-full border-4 border-t-0 p-4 rounded-lg flex justify-between gap-8">
                        <p>{report[`${platform}Custom`][`${platform}_basicTags`][`${platform}_metaDescription`]}</p>
                        <p className="w-1/5 min-w-36">{t("meta_description")}</p>
                    </div>
                }
            />


            <h2>Others</h2>
            {/* Link Text */}
            <Accordion
                head={
                    <div className="w-full border-4 p-4 rounded-lg flex justify-between items-start gap-24 group">
                        <p className="group-hover:opacity-75 duration-75">{report[`${platform}`].seo.linkText ? '✅' : '❌'} Link Text</p>
                        <a href="https://developer.chrome.com/docs/lighthouse/seo/link-text/" target="_blank" rel="noopener">
                            🌐 Link
                        </a>
                    </div>
                }
                body={
                    <div className="w-full border-4 border-t-0 p-4 rounded-lg flex justify-between gap-8">
                        Perfect!
                        <p className="w-1/5 min-w-36">{t("link_text")}</p>
                    </div>
                }
            />

            {/* is Crawlable */}
            <Accordion
                head={
                    <div className="w-full border-4 p-4 rounded-lg flex justify-between items-start gap-24 group">
                        <p className="group-hover:opacity-75 duration-75">{report[`${platform}`].seo.isCrawlable ? '✅' : '❌'} Is Crawlable?</p>
                        <a href="https://developer.chrome.com/docs/lighthouse/seo/is-crawlable" target="_blank" rel="noopener">
                            🌐 Link
                        </a>
                    </div>
                }
                body={
                    <div className="w-full border-4 border-t-0 p-4 rounded-lg flex justify-between gap-8">
                        Yes, is crawlable.
                        <p className="w-1/5 min-w-36">{t("is_crawlable")}</p>
                    </div>
                }
            />

            {/* hreflang */}
            <Accordion
                head={
                    <div className="w-full border-4 p-4 rounded-lg flex justify-between items-start gap-24 group">
                        <p className="group-hover:opacity-75 duration-75">{report[`${platform}`].seo.hreflangTags ? '✅' : '❌'} hreflang Tags</p>
                        <a href="https://developer.chrome.com/docs/lighthouse/seo/hreflang/" target="_blank" rel="noopener">
                            🌐 Link
                        </a>
                    </div>
                }
                body={
                    <div className="w-full border-4 border-t-0 p-4 rounded-lg flex justify-between gap-8">
                        Everything looks good.
                        <p className="w-1/5 min-w-36">{t("hreflang_tags")}</p>
                    </div>
                }
            />

            {/* Crawlable Anchors< */}
            <Accordion
                head={
                    <div className="w-full border-4 p-4 rounded-lg flex justify-between items-start gap-24 group">
                        <p className="group-hover:opacity-75 duration-75">{report[`${platform}`].seo.crawlableAnchors.length === 0 ? '✅' : '❌'} Crawlable Anchors</p>
                        <a href="https://support.google.com/webmasters/answer/9112205/" target="_blank" rel="noopener">
                            🌐 Link
                        </a>
                    </div>
                }
                body={
                    <div className="w-full border-4 border-t-0 p-4 rounded-lg flex flex-col justify-center items-start overflow-x-scroll">
                        <div>{report[`${platform}`].seo.crawlableAnchors.map((badAnchors: { node: { snippet: string } }, index: number) => (
                            <div key={index} className='text-nowrap'>
                                ❌ {index + 1}. {badAnchors.node.snippet}
                            </div>
                        ))}
                        </div>
                        <p className="w-1/5 min-w-36">{t("crawlable_anchors")}</p>
                    </div>
                }
            />

            {/* Imgage Alts */}
            <Accordion
                head={
                    <div className="w-full border-4 p-4 rounded-lg flex justify-between items-start gap-24 group">
                        {/* desktop: "pass:[]" (String), mobile: [] (Array) */}
                        <p className="group-hover:opacity-75 duration-75">{!Array.isArray(report[`${platform}`].seo.imageAlt) || report[`${platform}`].seo.imageAlt.length === 0 ? '✅' : '❌'} Image Alt</p>
                        <a href="https://dequeuniversity.com/rules/axe/4.9/image-alt" target="_blank" rel="noopener">
                            🌐 Link
                        </a>
                    </div>
                }
                body={
                    <div className="w-full border-4 border-t-0 p-4 rounded-lg flex justify-between gap-8">
                        <div>{Array.isArray(report[`${platform}`].seo.imageAlt) && report[`${platform}`].seo.imageAlt.map((badImg: { node: { snippet: string } }, index: number) => (
                            <div key={index} className='text-nowrap'>
                                ❌ {index + 1}. {badImg.node.snippet}
                            </div>
                        ))}
                        </div>
                        <p className="w-1/5 min-w-36">{t("image_alt")}</p>
                    </div>
                }
            />

            <h2>Social Media Tags</h2>
            {/* Open Graph */}
            <Accordion
                head={
                    <div className="w-full border-4 p-4 rounded-lg flex justify-between items-start gap-24 group">
                        <p className="group-hover:opacity-75 duration-75">{hasAllOgTags ? '✅' : '⚠️'} Open Graph</p>
                        <a href="https://ogp.me/" target="_blank" rel="noopener">
                            🌐 Link
                        </a>
                    </div>
                }
                body={
                    <div className="w-full border-4 border-t-0 p-4 rounded-lg flex justify-between gap-8">
                        <div>
                            <p>og title: {report && report[`${platform}Custom`][`${platform}_ogTags`][`${platform}_ogTitle`]}</p>
                            <p>og description: {report && report[`${platform}Custom`][`${platform}_ogTags`][`${platform}_ogDescription`]}</p>
                            <p>og type: {report && report[`${platform}Custom`][`${platform}_ogTags`][`${platform}_ogType`]}</p>
                            <p>og image: {report && report[`${platform}Custom`][`${platform}_ogTags`][`${platform}_ogImage`]}</p>
                            <p>og url: {report && report[`${platform}Custom`][`${platform}_ogTags`][`${platform}_ogUrl`]}</p>
                            <p>og site_name: {report && report[`${platform}Custom`][`${platform}_ogTags`][`${platform}_ogSiteName`]}</p>
                        </div>

                        <p className="w-1/5 min-w-36">{t("open_graph")}</p>
                    </div>
                }
            />

            <Accordion
                head={
                    <div className="w-full border-4 p-4 rounded-lg flex justify-between items-start gap-24 group">
                        <p className="group-hover:opacity-75 duration-75">{hasAllTwitterTags ? '✅' : '⚠️'} Twitter Card</p>
                        <a href="https://developer.x.com/en/docs/x-for-websites/cards/overview/markup" target="_blank" rel="noopener">
                            🌐 Link
                        </a>
                    </div>
                }
                body={
                    <div className="w-full border-4 border-t-0 p-4 rounded-lg flex justify-between gap-8">
                        <div>
                            <p>twitter card: {report && report[`${platform}Custom`][`${platform}_twitterTags`][`${platform}_twitterCard`]}</p>
                            <p>twitter title: {report && report[`${platform}Custom`][`${platform}_twitterTags`][`${platform}_twitterTitle`]}</p>
                            <p>twitter description: {report && report[`${platform}Custom`][`${platform}_twitterTags`][`${platform}_twitterDescription`]}</p>
                            <p>twitter image: {report && report[`${platform}Custom`][`${platform}_twitterTags`][`${platform}_twitterImage`]}</p>
                            <p>twitter image:alt: {report && report[`${platform}Custom`][`${platform}_twitterTags`][`${platform}_twitterImageAlt`]}</p>
                        </div>

                        <p className="w-1/5 min-w-36">{t("twitter_card")}</p>
                    </div>
                }
            />


        </div>
    )
}
export default ReportDetails;