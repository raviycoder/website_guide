 export interface WebsiteData {
    url: string;
    title: string;
    headings: {
        h1: string[];
        h2: string[];
        h3: string[];
    };
    buttons: Array<{
        text: string;
        id: string | null;
        className: string;
    }>;
    forms: Array<{
        id: string | null;
        action: string;
        inputs: Array<{
            type: string;
            name: string;
            placeholder:string;
        }>;
    }>;
    navLinks: string[];
    description: string;
    mainContent: string;
 }

// Get current tab info
export async function getCurrentTab(): Promise<chrome.tabs.Tab | null> {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab || null;
}

// Scrape data from current page
export async function scrapeCurrentPage(): Promise<WebsiteData | null> {
    try {
        const tab = await getCurrentTab();

        if (!tab?.id) {
            console.error('No active tab found.');
            return null;
        }

        // Check if URL is scrapable (not chrome:// pages)
        if (tab.url?.startsWith('chrome://')) {
            console.error('Cannot scrape chrome:// pages.');
            return null;
        }

        // Send message to content script
        const response = await chrome.tabs.sendMessage(tab.id, {
            action: 'scrapeData'
        });

        if (response?.success) {
            return response.data;
        }

        return null;
    } catch (error) {
        console.error('Error scraping current page:', error);

        //Fallback: Try to get from storage (cached data)
        const cached = await chrome.storage.local.get('currentPageData');
        return cached.currentPageData || null;
    }
}

// Format data for AI prompt
export function formatDataForAI(data: WebsiteData): string {
  return `
Website: ${data.title}
URL: ${data.url}
Description: ${data.description}

Main sections: ${data.headings.h1.join(', ')}
Key features: ${data.headings.h2.slice(0, 5).join(', ')}

Available actions:
- Buttons: ${data.buttons.map(b => b.text).slice(0, 5).join(', ')}
- Navigation: ${data.navLinks.slice(0, 5).join(', ')}

Forms: ${data.forms.length > 0 ? 'Yes (with ' + data.forms[0].inputs.length + ' fields)' : 'None'}
`.trim();
}

// Get simplified website summary
export function getWebsiteSummary(data:WebsiteData):string{
  return `${data.title} - ${data.description || data.mainContent.slice(0, 100)}`;
}