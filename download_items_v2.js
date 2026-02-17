const https = require('https');
const fs = require('fs');
const path = require('path');

const version = "14.5.1";

const items = [
    { id: '3151', name: 'LiandrysTorment' },
    { id: '3025', name: 'IcebornGauntlet' },
    { id: '3027', name: 'RodOfAges' },
    { id: '3285', name: 'LudensEcho' },
    { id: '3010', name: 'HarmonicEcho' },
];

const dir = path.join(__dirname, 'public', 'imagen', 'objetos');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://ddragon.leagueoflegends.com/'
    }
};

items.forEach(item => {
    const file = fs.createWriteStream(path.join(dir, `${item.name}.png`));
    const url = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.id}.png`;

    https.get(url, options, response => {
        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${item.name}`);
            });
        } else {
            console.error(`Failed ${item.name}: ${response.statusCode} at ${url}`);
            file.close();
        }
    }).on('error', err => {
        console.error(`Error ${item.name}: ${err.message}`);
    });
});
