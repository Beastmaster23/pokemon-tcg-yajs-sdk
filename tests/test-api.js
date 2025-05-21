import {get} from '../src/helper.js';
import assert from 'assert';
import dotenv from 'dotenv';
dotenv.config();

// Shared configuration for all test files
export let isWebsiteUp = false;

before(async () => {
    try {
        const response = await fetch('https://api.pokemontcg.io/v2/cards/xy1-1', {
            headers: {
                'X-Api-Key': process.env.POKEMON_TCG_API_KEY
            }
        });
        isWebsiteUp = response.status === 200;
    } catch (error) {
        isWebsiteUp = false;
    }
});

// Shared beforeEach hook for all test files
beforeEach(function() {
    if (!isWebsiteUp) {
        throw new Error('Website is not accessible');
    }
});

describe('API', () => {
    it('should successfully connect to the Pokemon TCG API and retrieve card data', async () => {
        if (!isWebsiteUp) {
            throw new Error('Website is not accessible');
        }
        const response = await get('https://api.pokemontcg.io/v2/cards/xy1-1');
        assert(response.data, 'should return data');
        assert.equal(response.data.id, 'xy1-1');
    }).timeout(10000);
});
