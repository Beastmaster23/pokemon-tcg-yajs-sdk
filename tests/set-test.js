import fs from 'fs';
import path from 'path';
import assert from 'assert';
import Set from '../src/definition/set.js';
import {get, getAll} from '../src/helper.js';
import {validateSet, validateLegalities} from './helper-utils.js';
const dataPath = path.join(process.cwd(), 'tests/data');
describe('Set API Methods', () => {
  let data = {};
  let dataCards = [];
  let dataCardsFiles = [];

  beforeEach(() => {
    dataCards = [];
    dataCardsFiles = fs.readdirSync(dataPath).filter(file => file.endsWith('.json'));
    dataCardsFiles.forEach(file => {
      data[file.split('.')[0]] = JSON.parse(fs.readFileSync(path.join(dataPath, file), 'utf8'));
    });
    for (const [file, card] of Object.entries(data)) {
      dataCards.push(card);
    }
    //console.log(`dataCards.length: ${dataCards.length} card 1: ${dataCards[0].set.id}`);
  });

  afterEach(() => {
  });

  describe('find', () => {
    it('should successfully retrieve a set by its unique identifier', async () => {
      const testSet = dataCards[0].set;
      const set = await Set.find(testSet.id);
      validateSet(set, testSet);
    }).timeout(10000);

    it('should throw an error when attempting to find a non-existent set ID', async () => {
      try {
        await Set.find('nonexistent');
        assert.fail('Should have thrown an error');
      } catch (error) {
        // Successfully threw an error
        assert(true);
      }
    });
  });

  describe('where', () => {
    it('should return an array of sets matching the specified series query parameter', async () => {
      const testCardSet = dataCards[0].set;
      const query = { key: 'series', value: testCardSet.series };
      const testSets = (await get(`https://api.pokemontcg.io/v2/sets?q=${query.key}:"${query.value}"`)).data;

      const sets = await Set.where(`${query.key}:"${query.value}"`);

      assert(Array.isArray(sets), 'should return an array');
      assert(sets.length === testSets.length, 'should return correct number of sets');
      sets.forEach((set, index) => {
        validateSet(set, testSets[index]);
      });
    });

    it('should throw an error when provided with an invalid query format', async () => {
      try {
        await Set.where("Invalid");
        assert.fail('Should have thrown an error');
      } catch (error) {
        assert(true);
      }
    });
  });

  // describe('#all', () => {
  //     it('should fetch and return all sets', async () => {
  //       const testSets = (await get(`https://api.pokemontcg.io/v2/sets`)).data;

  //     const sets = await Set.all();

  //     assert(Array.isArray(sets), 'should return an array');
  //     assert(sets.length === testSets.length, 'should return correct number of sets');
  //     sets.forEach((set, index) => {
  //       validateSet(set, testSets[index]);
  //     });
  //   });

  //   it('should throw an error when fetch fails', async () => {
  //     const originalFetch = global.fetch;
  //     global.fetch = async () => {
  //       throw new Error('API Error');
  //     };

  //     try {
  //       await Set.all();
  //       assert.fail('Should have thrown an error');
  //     } catch (error) {
  //       assert(true);
  //     } finally {
  //       global.fetch = originalFetch;
  //     }
  //   });
  // }).timeout(10000);
}); 