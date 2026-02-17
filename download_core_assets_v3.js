const https = require('https');
const fs = require('fs');
const path = require('path');

const downloads = [
    { name: 'logo.png', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Wild_Rift_Logo.png/500px-Wild_Rift_Logo.png' },
    { name: 'background.jpg', url: 'https://images.alphacoders.com/131/1318040.png' }
];

const dir = path.join(__dirname, 'public', 'imagen');

downloads.forEach(item => {
    const file = fs.createWriteStream(path.join(dir, item.name));
    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    };

    https.get(item.url, options, response => {
        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${item.name}`);
            });
        } else if (response.statusCode === 301 || response.statusCode === 302) {
            // Simple redirect handling
            https.get(response.headers.location, options, res2 => {
                res2.pipe(file);
                res2.on('finish', () => { file.close(); console.log(`Downloaded ${item.name} via redirect`); });
            });
        } else {
            console.error(`Failed ${item.name}: ${response.statusCode}`);
            file.close();
        }
    }).on('error', err => {
        console.error(`Error ${item.name}: ${err.message}`);
    });
});
