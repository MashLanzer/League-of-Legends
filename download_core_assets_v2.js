const https = require('https');
const fs = require('fs');
const path = require('path');

const downloads = [
    { name: 'logo.png', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Wild_Rift_Logo.png/500px-Wild_Rift_Logo.png' },
    { name: 'background.jpg', url: 'https://nexus.leagueoflegends.com/wp-content/uploads/2020/06/NX_Wild_Rift_Splash_1920x1080_unmqz85yxta88o2luzof.jpg' }
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
        }
    }).on('error', err => {
        console.error(`Error ${item.name}: ${err.message}`);
    });
});
