const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    console.log("Navigating to AgendaPro...");
    try {
        await page.goto('https://blackwhite.site.agendapro.com/cl/sucursal/129774/profesional/291788?creative_source=marketplace', { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        // wait a bit for it to load
        await page.waitForTimeout(5000);
        
        // Find services. The page likely has a list of services with prices.
        const services = await page.evaluate(() => {
            const items = [];
            // We need a generic way since we don't know the exact class names.
            // But usually there are text nodes containing price like "$" or "CLP"
            // Let's grab all text from the body to see the structure, or look for specific elements.
            return document.body.innerText;
        });
        
        fs.writeFileSync('agendapro_text.txt', services);
        console.log("Saved AgendaPro text content.");
    } catch (e) {
        console.error("Error with Playwright:", e);
    }
    
    await browser.close();
})();
