const https = require('https');
const fs = require('fs');
const path = require('path');

const assets = [
    { url: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/5111.png", name: "scuttle.png" },
    { url: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/1459.png", name: "dragon.png" },
    { url: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/4420.png", name: "herald.png" },
    { url: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/4419.png", name: "baron.png" },
    { url: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/1458.png", name: "elder.png" }
];

const downloadDir = path.join(__dirname, '..', 'public', 'imagen', 'timeline');

if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
}

assets.forEach(asset => {
    const filePath = path.join(downloadDir, asset.name);

    // Delete if exists and is 0 bytes or corrupted
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    const file = fs.createWriteStream(filePath);
    https.get(asset.url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    }, function (response) {
        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Descargado con éxito: ${asset.name}`);
            });
        } else {
            console.error(`Error descargando ${asset.name}: Estado ${response.statusCode}`);
            file.close();
        }
    }).on('error', err => {
        console.error(`Error de red para ${asset.name}: ${err.message}`);
    });
});
