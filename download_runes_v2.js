const https = require('https');
const fs = require('fs');
const path = require('path');

const runes = [
    // Keystones
    { name: 'Electrocute', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/Electrocute/Electrocute.png' },
    { name: 'SummonAery', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/SummonAery/SummonAery.png' },
    { name: 'Conqueror', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Conqueror/Conqueror.png' },
    { name: 'FleetFootwork', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png' },
    { name: 'PhaseRush', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png' },
    { name: 'GraspOfTheUndying', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png' },
    { name: 'Aftershock', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png' },
    { name: 'FirstStrike', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png' },
    { name: 'LethalTempo', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png' },
    { name: 'GlacialAugment', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png' },
    { name: 'ArcaneComet', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png' },

    // Domination
    { name: 'SuddenImpact', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png' },
    { name: 'EyeballCollection', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png' },
    { name: 'CheapShot', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/CheapShot/CheapShot.png' },

    // Precision
    { name: 'Triumph', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Triumph.png' },
    { name: 'CoupDeGrace', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png' },
    { name: 'GiantSlayer', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/GiantSlayer/GiantSlayer.png' },
    { name: 'LegendAlacrity', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png' },

    // Resolve
    { name: 'BonePlating', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/BonePlating/BonePlating.png' },
    { name: 'Conditioning', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/Conditioning/Conditioning.png' },
    { name: 'Overgrowth', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/Overgrowth/Overgrowth.png' },
    { name: 'SecondWind', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/SecondWind/SecondWind.png' },

    // Inspiration
    { name: 'ManaflowBand', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/ManaflowBand/ManaflowBand.png' },
    { name: 'GatheringStorm', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png' },
    { name: 'Transcendence', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/Transcendence/Transcendence.png' },
    { name: 'HextechFlashtraption', url: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/HextechFlashtraption/HextechFlashtraption.png' },
];

const dir = path.join(__dirname, 'public', 'imagen', 'runas');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

runes.forEach(rune => {
    const file = fs.createWriteStream(path.join(dir, `${rune.name}.png`));
    https.get(rune.url, response => {
        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${rune.name}`);
            });
        } else {
            file.close();
            fs.unlinkSync(path.join(dir, `${rune.name}.png`));
            console.error(`Failed ${rune.name}: ${response.statusCode}`);
        }
    }).on('error', err => {
        if (fs.existsSync(path.join(dir, `${rune.name}.png`))) fs.unlinkSync(path.join(dir, `${rune.name}.png`));
        console.error(`Error ${rune.name}: ${err.message}`);
    });
});
