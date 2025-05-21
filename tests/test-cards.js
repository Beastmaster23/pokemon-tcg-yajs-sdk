import assert from 'assert';
import Card from '../src/definition/card.js';
import cards from '../src/cards.js';
import { validateCard, validateArray } from './helper-utils.js';
import { get } from '../src/helper.js';

describe('Cards API', () => {
    it('should successfully retrieve a specific card by its ID and validate its properties', async () => {
        const data = await get(`https://api.pokemontcg.io/v2/cards/xy1-1`);
        const testCard = new Card(data.data);
        const card = await cards.find('xy1-1');
        assert.ok(card);
        assert.equal(card.id, 'xy1-1');
        validateCard(card, testCard);
    }).timeout(30000);

    it('should return an array of cards matching the specified name query parameter', async () => {
        const query = "name:charizard";
        const data = await get(`https://api.pokemontcg.io/v2/cards?q=${query}`);
        const testQueriedCards = data.data.map(card => new Card(card));
        const queriedCards = await cards.where(query);
        assert.ok(Array.isArray(queriedCards));
        validateArray(queriedCards, testQueriedCards, 'should have correct queried cards', 'should have correct queried card', validateCard);
    }).timeout(90000);
    // describe('#all', () => {
    //     it('should fetch all cards- will take an hour...', async () => {
    //         const allCards = await cards.all();
    //         assert.ok(Array.isArray(allCards));
    //     }).timeout(1000000);
    // });
});
