const https = require('https');
const fs = require('fs');
const path = require('path');

const items = [
    { url: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/0/07/Harmonic_Echo_WR_item.png', name: 'HarmonicEcho' },
    { url: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/e/ef/Liandry%27s_Torment_WR_item.png', name: 'LiandrysTorment' },
    { url: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/8/87/Iceborn_Gauntlet_WR_item.png', name: 'IcebornGauntlet' },
    { url: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/a/a3/Rod_of_Ages_WR_item.png', name: 'RodOfAges' },
    { url: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/e/e0/Luden%27s_Echo_WR_item.png', name: 'LudensEcho' },
];

const dir = path.join(__dirname, 'public', 'imagen', 'objetos');

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0'
    }
};

items.forEach(item => {
    const filePath = path.join(dir, `${item.name}.png`);
    const file = fs.createWriteStream(filePath);
    https.get(item.url, options, response => {
        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${item.name}`);
            });
        } else if (response.statusCode === 301 || response.statusCode === 302) {
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
