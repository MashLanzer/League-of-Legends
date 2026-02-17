const fs = require('fs');
const https = require('https');
const path = require('path');

const components = {
    "Sheen": "3057",
    "Phage": "3044",
    "Stinger": "3101",
    "BFsword": "1038",
    "ClothArmor": "1029",
    "JaurimsFist": "3052",
    "RubyCrystal": "1028",
    "CloakOfAgility": "1018",
    "LargeRod": "1058",
    "SeekersArmguard": "3191",
    "FiendishCodex": "3108"
};

const targetDir = path.join(__dirname, 'public', 'imagen', 'objetos');

// Ensure directory exists
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

Object.entries(components).forEach(([name, id]) => {
    const url = `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${id}.png`;
    const filePath = path.join(targetDir, `${name}.png`);

    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded: ${name}`);
        });
    }).on('error', (err) => {
        fs.unlink(filePath);
        console.error(`Error downloading ${name}: ${err.message}`);
    });
});
