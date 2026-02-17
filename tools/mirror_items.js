const https = require('https');
const fs = require('fs');
const path = require('path');

const mirror_sources = [
    { id: '3025', name: 'IcebornGauntlet', url: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/8/87/Iceborn_Gauntlet_WR_item.png' },
    { id: '3010', name: 'HarmonicEcho', url: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/0/07/Harmonic_Echo_WR_item.png' },
    { id: '3151', name: 'LiandrysTorment', url: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/e/ef/Liandry%27s_Torment_WR_item.png' },
    { id: '3027', name: 'RodOfAges', url: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/a/a3/Rod_of_Ages_WR_item.png' },
    { id: '3285', name: 'LudensEcho', url: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/e/e0/Luden%27s_Echo_WR_item.png' },
];

const dir = path.join(__dirname, 'public', 'imagen', 'objetos');

mirror_sources.forEach(item => {
    const file = fs.createWriteStream(path.join(dir, `${item.name}.png`));
    https.get(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, response => {
        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => { file.close(); console.log(`Mirrored ${item.name}`); });
        } else if (response.statusCode === 301 || response.statusCode === 302) {
            https.get(response.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res2 => {
                res2.pipe(file);
                res2.on('finish', () => { file.close(); console.log(`Mirrored ${item.name} via redirect`); });
            });
        }
    });
});
