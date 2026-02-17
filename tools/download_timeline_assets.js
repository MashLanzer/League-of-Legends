const https = require('https');
const fs = require('fs');
const path = require('path');

const assets = [
    { url: "https://static.wikia.nocookie.net/leagueoflegends/images/1/1b/Rift_Scuttler_Original_Square.png", name: "scuttle.png" },
    { url: "https://static.wikia.nocookie.net/leagueoflegends/images/4/4a/Infernal_Drake_Original_Square.png", name: "dragon.png" },
    { url: "https://static.wikia.nocookie.net/leagueoflegends/images/c/c2/Rift_Herald_Original_Square.png", name: "herald.png" },
    { url: "https://static.wikia.nocookie.net/leagueoflegends/images/d/d4/Baron_Nashor_Original_Square.png", name: "baron.png" },
    { url: "https://static.wikia.nocookie.net/leagueoflegends/images/4/4b/Elder_Dragon_Original_Square.png", name: "elder.png" }
];

const downloadDir = path.join(__dirname, 'public', 'imagen', 'timeline');

if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
}

assets.forEach(asset => {
    const file = fs.createWriteStream(path.join(downloadDir, asset.name));
    https.get(asset.url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': 'https://leagueoflegends.fandom.com/'
        }
    }, function (response) {
        if (response.statusCode === 200) {
            response.pipe(file);
            console.log(`Descargado: ${asset.name}`);
        } else {
            console.error(`Error descargando ${asset.name}: Estado ${response.statusCode}`);
        }
    });
});
