const https = require('https');
const fs = require('fs');
const path = require('path');

const version = "14.2.1";

const categories = {
    "Ataque": [
        { id: '3031', name: 'InfinityEdge', es: 'Filo del Infinito', stats: '+55 AD | +25% Crítico' },
        { id: '3078', name: 'TrinityForce', es: 'Fuerza de la Trinidad', stats: '+35 AD | +25% AS | +333 Vida' },
        { id: '3153', name: 'BladeOfTheRuinedKing', es: 'Rey Arruinado', stats: '+20 AD | +35% AS | +10% Vamp' },
        { id: '3046', name: 'PhantomDancer', es: 'Bailarín Espectral', stats: '+25% Crítico | +35% AS' },
        { id: '3033', name: 'MortalReminder', es: 'Recordatorio Mortal', stats: '+45 AD | +30% Pen.' },
        { id: '6676', name: 'TheCollector', es: 'La Recaudadora', stats: '+40 AD | +25% Crítico' },
        { id: '3071', name: 'BlackCleaver', es: 'Cuchilla Negra', stats: '+40 AD | +350 Vida | +20 Haste' },
        { id: '3074', name: 'RavenousHydra', es: 'Hidra Voraz', stats: '+70 AD | +15 Haste' },
        { id: '3124', name: 'GuinsoosRageblade', es: 'Espada de Furia de Guinsoo', stats: '+25% AS | +20 AD' },
        { id: '3142', name: 'YoumuusGhostblade', es: 'Filo Fantasmal de Youmuu', stats: '+55 AD | +15 Haste' },
        { id: '3147', name: 'DuskbladeOfDraktharr', es: 'Hoja Crepuscular de Draktharr', stats: '+55 AD | +15 Haste' },
        { id: '3508', name: 'EssenceReaver', es: 'Segador de Esencia', stats: '+40 AD | +25% Crítico' },
        { id: '3181', name: 'Hullbreaker', es: 'Rompecascos', stats: '+55 AD | +400 Vida' },
        { id: '3004', name: 'Manamune', es: 'Manamune', stats: '+35 AD | +500 Mana' },
        { id: '3035', name: 'LordDominiksRegards', es: 'Recuerdos de Lord Dominik', stats: '+35 AD | +25% Crítico' },
        { id: '3085', name: 'RunaansHurricane', es: 'Huracán de Runaan', stats: '+45% AS | +25% Crítico' },
        { id: '6695', name: 'SeryldasGrudge', es: 'Rencor de Serylda', stats: '+40 AD | +15 Haste' },
        { id: '3072', name: 'Bloodthirster', es: 'La Sanguinaria', stats: '+50 AD | +25% Crítico' },
        { id: '3094', name: 'RapidFirecannon', es: 'Cañón de Fuego Rápido', stats: '+35% AS | +25% Crítico' },
        { id: '3087', name: 'StatikkShiv', es: 'Puñal de Statikk', stats: '+35% AS | +25% Crítico' }
    ],
    "Magia": [
        { id: '3089', name: 'RabadonsDeathcap', es: 'Sombrero de Rabadon', stats: '+120 AP' },
        { id: '3285', name: 'LudensEcho', es: 'Eco de Luden', stats: '+85 AP | +300 Mana' },
        { id: '3151', name: 'LiandrysTorment', es: 'Tormento de Liandry', stats: '+70 AP | +250 Vida' },
        { id: '3003', name: 'SeraphsEmbrace', es: 'Abrazo del Serafín', stats: '+60 AP | +1200 Mana' },
        { id: '3135', name: 'VoidStaff', es: 'Báculo del Vacío', stats: '+70 AP | +45% Pen.' },
        { id: '3115', name: 'NashorsTooth', es: 'Diente de Nashor', stats: '+70 AP | +45% AS' },
        { id: '3027', name: 'RodOfAges', es: 'Bastón de las Edades', stats: '+60 AP | +250 Vida' },
        { id: '3916', name: 'InfinityOrb', es: 'Orbe del Infinito', stats: '+60 AP | +5% Mov.' },
        { id: '3100', name: 'LichBane', es: 'Perdición del Liche', stats: '+80 AP | +10 Haste' },
        { id: '3165', name: 'Morellonomicon', es: 'Morellonomicon', stats: '+75 AP | +150 Vida' },
        { id: '3116', name: 'RylaisCrystalScepter', es: 'Cetro de Cristal de Rylai', stats: '+70 AP | +350 Vida' },
        { id: '4628', name: 'HorizonFocus', es: 'Enfoque al Horizonte', stats: '+80 AP | +150 Vida' },
        { id: '4637', name: 'Riftmaker', es: 'Agrietador', stats: '+80 AP | +150 Vida | +15 Haste' },
        { id: '3157', name: 'ZhonyasHourglass', es: 'Reloj de Arena de Zhonya', stats: '+80 AP | +15 Haste' },
        { id: '3041', name: 'MejaisSoulstealer', es: 'Ladrona de Almas de Mejai', stats: '+20 AP | +100 Vida' }
    ],
    "Defensa": [
        { id: '3143', name: 'RanduinsOmen', es: 'Presagio de Randuin', stats: '+400 Vida | +55 Armadura' },
        { id: '3065', name: 'SpiritVisage', es: 'Apariencia Espiritual', stats: '+350 Vida | +50 RM' },
        { id: '3075', name: 'Thornmail', es: 'Malla de Espinas', stats: '+200 Vida | +75 Armadura' },
        { id: '3742', name: 'DeadMansPlate', es: 'Coraza del Hombre Muerto', stats: '+250 Vida | +50 Armadura' },
        { id: '3025', name: 'IcebornGauntlet', es: 'Guantelete de Hielo', stats: '+250 Vida | +50 Armadura' },
        { id: '4401', name: 'ForceOfNature', es: 'Fuerza de la Naturaleza', stats: '+350 Vida | +50 RM' },
        { id: '3110', name: 'FrozenHeart', es: 'Corazón de Hielo', stats: '+70 Armadura | +400 Mana' },
        { id: '6662', name: 'MantleOfTheTwelfthHour', es: 'Manto de la 12ª Hora', stats: '+200 Vida | +50 Arm/RM' },
        { id: '3068', name: 'SunfireAegis', es: 'Égida de Fuego Solar', stats: '+500 Vida | +15 Haste' },
        { id: '3053', name: 'SteraksGage', es: 'Guantelete de Sterak', stats: '+400 Vida' },
        { id: '3026', name: 'GuardianAngel', es: 'Ángel Guardián', stats: '+40 AD | +40 Armadura' },
        { id: '2504', name: 'AmaranthsTwinguard', es: 'Protección de Amarante', stats: '+55 Armadura | +55 RM' },
        { id: '8001', name: 'WarmogsArmor', es: 'Armadura de Warmog', stats: '+700 Vida' }
    ],
    "Soporte": [
        { id: '3107', name: 'Redemption', es: 'Redención', stats: '+250 Vida | +10 Haste' },
        { id: '3190', name: 'LocketOfTheIronSolari', es: 'Solari de Hierro', stats: '+10 Haste' },
        { id: '3012', name: 'ArdentCenser', es: 'Incensario Ardiente', stats: '+60 AP | +250 Vida' },
        { id: '4005', name: 'ImperialMandate', es: 'Mandato Imperial', stats: '+40 AP | +200 Vida' },
        { id: '3109', name: 'ProtectorsVow', es: 'Promesa del Protector', stats: '+350 Vida | +40 Armadura' },
        { id: '3050', name: 'ZekesConvergence', es: 'Convergencia de Zeke', stats: '+40 Armadura | +40 RM' },
        { id: '3101', name: 'HarmonicEcho', es: 'Eco Armónico', stats: '+75 AP | +300 Mana' },
        { id: '2065', name: 'ShurelyasBattlesong', es: 'Canción de Batalla de Shurelya', stats: '+50 AP | +15 Haste' }
    ],
    "Botas": [
        { id: '3009', name: 'BootsOfSwiftness', es: 'Botas de Rapidez', stats: '+50 Movimiento' },
        { id: '1001', name: 'BootsOfSpeed', es: 'Botas de Velocidad', stats: '+20 Movimiento' },
        { id: '3006', name: 'BerserkersGreaves', es: 'Grebas de Berserker', stats: '+35% AS' },
        { id: '3047', name: 'PlatedSteelcaps', es: 'Punteras de Acero', stats: '+35 Armadura' },
        { id: '3111', name: 'MercurysTreads', es: 'Pasos de Mercurio', stats: '+35 RM | +35% Tenacidad' },
        { id: '3158', name: 'IonianBootsOfLucidity', es: 'Botas de Lucidez', stats: '+15 Haste' },
        { id: '3020', name: 'SorcerersShoes', es: 'Zapatos de Hechicero', stats: '+18 Pen. Mágica' }
    ]
};

const dir = path.join(__dirname, '..', 'public', 'imagen', 'objetos');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0'
    }
};

const allItems = Object.values(categories).flat();

allItems.forEach(item => {
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

// Generate local JSON for the page
fs.writeFileSync(path.join(__dirname, '..', 'public', 'items_data.json'), JSON.stringify(categories, null, 2));
console.log('JSON data generated');
