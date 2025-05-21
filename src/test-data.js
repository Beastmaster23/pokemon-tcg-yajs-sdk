import fs from 'fs';
import path from 'path';
import configuration from './configure.js';
import lib from './lib.js';
import dotenv from 'dotenv';
import cliProgress from 'cli-progress';
import { getAll } from './helper.js';
const MAX_CARDS = 10;

// Helper function to generate a random number between min and max
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to pick a random item from an array
const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

const retryGetRandomCards = async (url, array, query, retries = 3) => {
    let item = null;
    let cards = [];
    let itemsTried = [];
    for (let i = 0; i < retries; i++) {
        try {
            item = randomItem(array);
            itemsTried.push(item);
            cards = await getAll(`${url}?q=${query}:"${item}"`);
            if (cards.length > 0) {
                return cards;
            }
        } catch (error) {
            if (i === retries - 1) {
                throw new Error(`\nFailed to get random item from ${url}?q=${query}:"${itemsTried.join('","')}" after ${i + 1} retries. ${error}`);
            }
        }
        
        array.splice(array.indexOf(item), 1);
    }
    if (cards.length === 0) {
        throw new Error(`\nFailed to get random item from ${url}?q=${query}:"${itemsTried.join('","')}" after ${retries} retries.`);
    }
    return cards
}
const Classification = {
    "Trainer": [
        "Item",
        "Supporter",
        "Stadium",
        "Pokémon Tool",
        "Pokémon Tool F",
        "Technical Machine",
        "Goldenrod Game Corner",
        "Rocket's Secret Machine",
        "ACE SPEC",
        "Future",
        "Ancient",
        "Team Plasma"
    ],
    "Energy": [
        "Basic",
        "Special",
        "Team Plasma"
    ],
    "Pokémon": [
        "Future",
        "Ancient",
        "Team Plasma"
    ]
}
// Everything else is a Pokémon subtype

// Card data generators
const generateCard = async (typeData, typeToGenerate, retries = 3) => {
    const { supertypes, subtypes, types, rarities, sets } = typeData;
    const url = `${configuration.baseUrl}/cards`;
    let cards = [];
    let card = {};
    switch (typeToGenerate) {
        case "Supertype":
            // Randomly select attributes
            cards = await retryGetRandomCards(url, supertypes, 'supertype', retries).catch(console.error);
            card = randomItem(cards);
            break;
        case "Subtype":
            // Randomly select attributes
            cards = await retryGetRandomCards(url, subtypes, 'subtypes', retries).catch(console.error);
            card = randomItem(cards);
            break;
        case "Type":
            // Randomly select attributes
            cards = await retryGetRandomCards(url, types, 'types', retries).catch(console.error);
            card = randomItem(cards);
            break;
        case "Rarity":
            // Randomly select attributes
            cards = await retryGetRandomCards(url, rarities, 'rarity', retries).catch(console.error);
            card = randomItem(cards);

            break;
        case "Set":
            // Randomly select attributes
            let ids = sets.map(set => set.id);
            cards = await retryGetRandomCards(url, ids, 'set.id', retries).catch(console.error);
            card = randomItem(cards);
            break;
    }

    return card
}

// Create data directory if it doesn't exist
const dataDir = path.join(process.cwd(), 'tests/data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Main function to generate all cards
const generateAllCards = async () => {
    dotenv.config();
    lib.configure(process.env.POKEMON_TCG_API_KEY);

    // Fetch all type data first
    const typeData = {
        supertypes: (await get(configuration.baseUrl + '/supertypes')).data,
        subtypes: (await get(configuration.baseUrl + '/subtypes')).data,
        types: (await get(configuration.baseUrl + '/types')).data,
        rarities: (await get(configuration.baseUrl + '/rarities')).data,
        sets: (await get(configuration.baseUrl + '/sets')).data
    };
    if (typeData.sets.length >= 250 || typeData.rarities.length >= 250 || typeData.subtypes.length >= 250
        || typeData.types.length >= 250 || typeData.supertypes.length >= 250) {
        throw new Error('Need to update XD Yep Ai could do it by then...');
    }

    // Filter out subtypes that are specific to Trainer and Energy
    typeData.subtypes = typeData.subtypes.filter(subtype =>
        !Classification["Trainer"].includes(subtype) &&
        !Classification["Energy"].includes(subtype)
    );
    const bar1 = new cliProgress.SingleBar({
        format: 'Generating cards |{bar}| {percentage}% || {value}/{total} Cards',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    }, cliProgress.Presets.shades_classic);
    bar1.start(MAX_CARDS, 0);
    const cardTypes = ["Supertype", "Subtype", "Type", "Rarity", "Set"];
    const startTime = Date.now();
    // Generate and save cards
    let i = 0;
    for (i = 1; i <= MAX_CARDS; i++) {
        bar1.increment();
        try {
            const card = await generateCard(typeData, cardTypes[i % cardTypes.length]);
            if (card.id) {
                const filePath = path.join(dataDir, `card-${i}.json`);
                fs.writeFileSync(filePath, JSON.stringify(card, null, 2));
            } else {
                console.error(`\nFailed to generate card ${i}: ${card}`);
                break;
            }
        } catch (error) {
            console.error(`\nFailed to generate card ${i}: ${error}`);
            break;
        }
        bar1.update(i);
    }
    bar1.stop();
    const endTime = Date.now();

    console.log(`Generated ${i-1} test card JSON files in the data directory in ${((endTime - startTime) / 1000).toFixed(2)} seconds`);
}

// Run the generation
generateAllCards().catch(console.error);
