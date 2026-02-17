const https = require('https');
const fs = require('fs');
const path = require('path');

const downloads = [
    { name: 'logo.png', url: 'https://logos-world.net/wp-content/uploads/2021/02/League-of-Legends-Wild-Rift-Logo.png' },
    { name: 'background.jpg', url: 'https://images2.alphacoders.com/112/1125211.jpg' } // A generic wild rift background
];

const dir = path.join(__dirname, 'public', 'imagen');

downloads.forEach(item => {
    const file = fs.createWriteStream(path.join(dir, item.name));
    https.get(item.url, response => {
        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${item.name}`);
            });
        } else {
            console.error(`Failed ${item.name}: ${response.statusCode}`);
            file.close();
            fs.unlinkSync(path.join(dir, item.name));
        }
    }).on('error', err => {
        console.error(`Error ${item.name}: ${err.message}`);
    });
});
