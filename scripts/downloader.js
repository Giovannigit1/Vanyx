const fs = require('fs');
const https = require('https');
const path = require('path');

const data = JSON.parse(fs.readFileSync('instagram_data.json', 'utf-8'));

const assetsDir = path.join(__dirname, 'assets', 'instagram');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                   .on('error', reject)
                   .once('close', () => resolve(filepath));
            } else {
                reject(new Error(`Failed with status: ${res.statusCode}`));
            }
        }).on('error', reject);
    });
};

(async () => {
    try {
        console.log("Downloading profile picture...");
        if (data.profilePicUrl) {
            await downloadImage(data.profilePicUrl, path.join(assetsDir, 'profile.jpg'));
            console.log("Downloaded profile.jpg");
        }

        console.log("Downloading grid posts...");
        const gridImages = data.images.filter(img => (img.includes('s640x640') || img.includes('s512x512')) && !img.includes('150x150') && img !== data.profilePicUrl);
        const uniqueGrid = [...new Set(gridImages)];
        
        let count = 1;
        for (const imgUrl of uniqueGrid) {
            if (count > 12) break;
            const filename = `post-${count}.jpg`;
            await downloadImage(imgUrl, path.join(assetsDir, filename));
            console.log(`Downloaded ${filename}`);
            count++;
        }
        console.log("Download complete!");
    } catch (e) {
        console.error("Error:", e);
    }
})();
