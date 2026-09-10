const https = require('https'); 
https.get('https://www.instagram.com/blvckwhite.cl/', res => { 
    let data = ''; 
    res.on('data', c => data += c); 
    res.on('end', () => console.log(data.match(/"biography":"(.*?)"/)?.[1] || 'No bio found')); 
});
