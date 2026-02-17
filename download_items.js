const https = require('https');
const fs = require('fs');
const path = require('path');

const version = "14.2.1";

const items = [
    { id: '3031', name: 'InfinityEdge' },
    { id: '3078', name: 'TrinityForce' },
    { id: '3153', name: 'BladeOfTheRuinedKing' },
    { id: '3046', name: 'PhantomDancer' },
    { id: '3033', name: 'MortalReminder' },
    { id: '6676', name: 'TheCollector' },
    { id: '3071', name: 'BlackCleaver' },
    { id: '3074', name: 'RavenousHydra' },
    { id: '3089', name: 'RabadonsDeathcap' },
    { id: '3285', name: 'LudensEcho' },
    { id: '3151', name: 'LiandrysTorment' },
    { id: '3003', name: 'SeraphsEmbrace' },
    { id: '3135', name: 'VoidStaff' },
    { id: '3115', name: 'NashorsTooth' },
    { id: '3027', name: 'RodOfAges' },
    { id: '3916', name: 'InfinityOrb' },
    { id: '3143', name: 'RanduinsOmen' },
    { id: '3065', name: 'SpiritVisage' },
    { id: '3075', name: 'Thornmail' },
    { id: '3742', name: 'DeadMansPlate' },
    { id: '3025', name: 'IcebornGauntlet' },
    { id: '4401', name: 'ForceOfNature' },
    { id: '3110', name: 'FrozenHeart' },
    { id: '6662', name: 'MantleOfTheTwelfthHour' },
    { id: '3107', name: 'Redemption' },
    { id: '3190', name: 'LocketOfTheIronSolari' },
    { id: '3010', name: 'HarmonicEcho' },
    { id: '4005', name: 'ImperialMandate' },
    { id: '3109', name: 'ProtectorsVow' },
    { id: '3050', name: 'ZekesConvergence' },
    { id: '3009', name: 'BootsOfSwiftness' },
    { id: '3111', name: 'BootsOfDynamism' },
    { id: '3158', name: 'GluttonousGreaves' },
];

const dir = path.join(__dirname, 'public', 'imagen', 'objetos');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
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
            console.error(`Failed ${item.name}: ${response.statusCode}`);
            file.close();
        }
    }).on('error', err => {
        console.error(`Error ${item.name}: ${err.message}`);
    });
});
