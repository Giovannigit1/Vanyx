const { chromium } = require('playwright');
const fs = require('fs');
const https = require('https');
const path = require('path');

(async () => {
    console.log("Launching browser...");
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    console.log("Navigating to Instagram...");
    try {
        await page.goto('https://www.instagram.com/blvckwhite.cl/', { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        await page.waitForTimeout(5000);
        
        const ogTitle = await page.evaluate(() => document.querySelector('meta[property="og:title"]')?.content || '');
        const ogDescription = await page.evaluate(() => document.querySelector('meta[property="og:description"]')?.content || '');
        let profilePicUrl = await page.evaluate(() => document.querySelector('meta[property="og:image"]')?.content || '');
        
        console.log("OG Title:", ogTitle);
        console.log("OG Description:", ogDescription);
        console.log("OG Image:", profilePicUrl);
        
        const images = await page.evaluate(() => {
            const imgs = Array.from(document.querySelectorAll('img'));
            return imgs.map(img => img.src).filter(src => src && (src.includes('scontent') || src.includes('instagram')));
        });
        
        console.log(`Found ${images.length} images on page.`);
        
        const data = {
            ogTitle,
            ogDescription,
            profilePicUrl,
            images: images
        };
        fs.writeFileSync('instagram_data.json', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Error with Playwright:", e);
    }
    
    await browser.close();
})();
