import { useState, useEffect } from "react";
import { scrapeCurrentPage, formatDataForAI, getWebsiteSummary, type WebsiteData } from "@/lib/website-scraper";

export function useWebsiteInfo() {
    const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        async function fetchData() {
            try {
                setLoading(true);
                const data = await scrapeCurrentPage();

                if (data) {
                    setWebsiteData(data);
                } else {
                    setError('Could not scrape page data');
                }
            } catch (error) {
                setError('Failed to get website info');
                console.error(error);
            } finally {
                setLoading(false)
            }
        }

        fetchData();
    }, []);

    // Derived values
    const summary = websiteData ? getWebsiteSummary(websiteData):'';
    const aiPromptData = websiteData? formatDataForAI(websiteData): '';

    return {
        websiteData,
        summary,
        aiPromptData,
        loading,
        error,
        refetch: () => {
            setLoading(true);
            scrapeCurrentPage().then(setWebsiteData).finally(()=>setLoading(false));
        }
    };
}