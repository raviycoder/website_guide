// src/content/content-script.ts

// Function to scrape page data
function scrapePageData() {
  const pageData = {
    url: window.location.href,
    title: document.title,
    
    // Main content
    headings: {
      h1: Array.from(document.querySelectorAll('h1')).map(h => h.textContent?.trim() || ''),
      h2: Array.from(document.querySelectorAll('h2')).map(h => h.textContent?.trim() || ''),
    },
    
    // Interactive elements
    buttons: Array.from(document.querySelectorAll('button, input[type="button"], input[type="submit"]'))
      .map(btn => ({
        text: btn.textContent?.trim() || (btn as HTMLInputElement).value || '',
        id: btn.id,
        className: btn.className
      }))
      .filter(btn => btn.text)
      .slice(0, 10), // Limit to 10 buttons
    
    // Forms
    forms: Array.from(document.querySelectorAll('form')).map(form => ({
      id: form.id,
      action: form.action,
      inputs: Array.from(form.querySelectorAll('input, select, textarea'))
        .map(input => ({
          type: input.getAttribute('type') || input.tagName.toLowerCase(),
          name: input.getAttribute('name') || '',
          placeholder: input.getAttribute('placeholder') || ''
        }))
    })),
    
    // Navigation links
    navLinks: Array.from(document.querySelectorAll('nav a, header a'))
      .map(link => link.textContent?.trim() || '')
      .filter(text => text)
      .slice(0, 10),
    
    // Meta description
    description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    
    // Main text content (first 500 chars)
    mainContent: document.body.innerText.slice(0, 500).trim()
  };
  
  return pageData;
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'scrapeData') {
    const data = scrapePageData();
    sendResponse({ success: true, data });
  }
  return true; // Keep message channel open for async response
});

// Auto-scrape on page load and cache
const initialData = scrapePageData();
chrome.storage.local.set({ currentPageData: initialData });
