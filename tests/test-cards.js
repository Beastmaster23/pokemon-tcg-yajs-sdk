import assert from 'assert';
import Card from '../src/definition/card.js';
import cards from '../src/cards.js';
import { validateCard, validateArray } from './helper-utils.js';
import { get } from '../src/helper.js';

describe('Cards API', () => {
    it('should successfully retrieve a specific card by its ID and validate its properties', async () => {
        const data = (await get(`https://api.pokemontcg.io/v2/cards/xy1-1`)).data;
        const testCard = new Card(data);
        const card = await cards.find('xy1-1');
        assert.ok(card);
        assert.equal(card.id, 'xy1-1');
        validateCard(card, testCard);
    }).timeout(30000);

    it('should return an array of cards matching the specified name query parameter', async () => {
        const query = "name:charizard";
        const data = (await get(`https://api.pokemontcg.io/v2/cards?q=${query}`)).data;
        const testQueriedCards = data.map(card => new Card(card));
        const queriedCards = await cards.where(query);
        assert.ok(Array.isArray(queriedCards));
        validateArray(queriedCards, testQueriedCards, 'should have correct queried cards', 'should have correct queried card', validateCard);
    }).timeout(90000);
    describe('all', () => {
        it('should fetch all cards- will take an hour...', async () => {
            const allCards = await cards.all();
            console.log(`Total cards fetched: ${allCards.length}`);
            assert.ok(Array.isArray(allCards));
            assert.ok(allCards.length > 0, `should have at least one card total: ${allCards.length}`);
            assert.ok(allCards.length > 250, `should have more than 250 cards total: ${allCards.length}`);
        }).timeout(1000000);
    });
});
