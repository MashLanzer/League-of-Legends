const https = require('https');
const fs = require('fs');
const path = require('path');

const champions = [
    { name: 'Aurora', id: 'Aurora' },
    { name: 'Ambessa', id: 'Ambessa' }
];

const targetDir = path.join(__dirname, 'public', 'imagen', 'campeones');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

champions.forEach(champ => {
    const url = `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${champ.id}.png`;
    const filePath = path.join(targetDir, `${champ.name}.png`);
    const file = fs.createWriteStream(filePath);

    https.get(url, (response) => {
        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Descargado: ${champ.name}.png`);
            });
        } else {
            console.error(`Error descargando ${champ.name}: ${response.statusCode}`);
            file.close();
            fs.unlink(filePath, () => { }); // Borra archivo vacío
        }
    }).on('error', (err) => {
        console.error(`Error en la petición para ${champ.name}: ${err.message}`);
        fs.unlink(filePath, () => { });
    });
});
