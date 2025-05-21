import Card from '../src/definition/card.js';
import Set from '../src/definition/set.js';
import assert from 'assert';

const validateCard = (card, testCard) => {
    assert(card instanceof Card, 'should return a Card instance');
    assert(card.id === testCard.id, 'should have correct id');
    assert(card.name === testCard.name, 'should have correct name');
    assert(card.supertype === testCard.supertype, 'should have correct supertype (Trainer, Energy, Pokemon)');
    validateArray(card.subtypes, testCard.subtypes, 'should have correct subtypes');
    assert(card.level === testCard.level, 'should have correct level');
    assert(card.hp === testCard.hp, 'should have correct hp');
    validateArray(card.types, testCard.types, 'should have correct types');
    assert(card.evolvesFrom === testCard.evolvesFrom, 'should have correct evolvesFrom');
    if (card.evolvesTo) {
        validateArray(card.evolvesTo, testCard.evolvesTo, 'should have correct evolvesTo');
    }
    validateArray(card.rules, testCard.rules, 'should have correct rules');
    if (card.ancientTrait) {
        validateAncientTrait(card.ancientTrait, testCard.ancientTrait);
    }
    if (card.abilities) {
        validateArray(card.abilities, testCard.abilities, 'should have correct abilities', 'should have correct ability', validateAbility);
    }
    validateArray(card.attacks, testCard.attacks, 'should have correct attacks', 'should have correct attack', validateAttack);
    assert((card.weaknesses && testCard.weaknesses) || (!card.weaknesses && !testCard.weaknesses), 'should have weaknesses if testCard has weaknesses');
    if (card.weaknesses) {
        validateArray(card.weaknesses, testCard.weaknesses, 'should have correct weaknesses', 'should have correct weakness', validateWeakness);
    }
    assert((card.resistances && testCard.resistances) || (!card.resistances && !testCard.resistances), 'should have resistances if testCard has resistances');
    if (card.resistances) {
        validateArray(card.resistances, testCard.resistances, 'should have correct resistances', 'should have correct resistance', validateResistance);
    }
    assert((card.retreatCost && testCard.retreatCost) || (!card.retreatCost && !testCard.retreatCost), 'should have retreatCost if testCard has retreatCost');
    if (card.retreatCost) {
        validateArray(card.retreatCost, testCard.retreatCost, 'should have correct retreatCost');
    }
    assert(card.convertedRetreatCost === testCard.convertedRetreatCost, 'should have correct amount of retreatCost');
    validateSet(card.set, testCard.set);
    assert(card.number === testCard.number, 'should have correct number');
    assert(card.artist === testCard.artist, 'should have correct artist');
    assert(card.rarity === testCard.rarity, 'should have correct rarity');
    assert(card.flavorText === testCard.flavorText, 'should have correct flavorText');
    validateArray(card.nationalPokedexNumbers, testCard.nationalPokedexNumbers, 'should have correct nationalPokedexNumbers');
    assert((card.legalities && testCard.legalities) || (!card.legalities && !testCard.legalities), 'should have legalities if testCard has legalities');
    if (card.legalities) {
        validateLegalities(card.legalities, testCard.legalities);
    }
    assert(card.regulationMark === testCard.regulationMark, 'should have correct regulationMark');
    if (card.images) {
        assert(card.images.small === testCard.images.small, 'should have correct small image');
        assert(card.images.large === testCard.images.large, 'should have correct large image');
    }
    if (card.tcgplayer) {
        validateTCGPlayer(card.tcgplayer, testCard.tcgplayer);
    }
    if (card.cardmarket) {
        validateCardMarket(card.cardmarket, testCard.cardmarket);
    }
}

const validateArray = (array, testArray, msgArray = "should have correct array", msgItem = "should have correct value", validateItem = (item, testItem, msgItem) => {
    assert(item === testItem, `${msgItem} - ${item} + ${testItem}`);
}) => {
    assert(array.length === testArray.length, `${msgArray} - ${array.length} + ${testArray.length}`);
    for (let i = 0; i < array.length; i++) {
        validateItem(array[i], testArray[i], msgItem);
    }
}

const validateAncientTrait = (ancientTrait, testAncientTrait) => {
    assert(ancientTrait.name === testAncientTrait.name, `should have correct name - ${ancientTrait.name} + ${testAncientTrait.name}`);
    assert(ancientTrait.text === testAncientTrait.text, `should have correct text - ${ancientTrait.text} + ${testAncientTrait.text}`);
}

const validateAbility = (ability, testAbility) => {
    assert(ability.name === testAbility.name, `should have correct name - ${ability.name} + ${testAbility.name}`);
    assert(ability.text === testAbility.text, `should have correct text - ${ability.text} + ${testAbility.text}`);
    assert(ability.type === testAbility.type, `should have correct type - ${ability.type} + ${testAbility.type}`);
}

const validateAttack = (attack, testAttack) => {
    validateArray(attack.cost, testAttack.cost, 'should have correct cost', 'should have correct cost item');
    assert(attack.name === testAttack.name, `should have correct name - ${attack.name} + ${testAttack.name}`);
    assert(attack.text === testAttack.text, `should have correct text - ${attack.text} + ${testAttack.text}`);
    assert(attack.damage === testAttack.damage, `should have correct damage - ${attack.damage} + ${testAttack.damage}`);
    assert(attack.convertedEnergyCost === testAttack.convertedEnergyCost, `should have correct amount of energy cost - ${attack.convertedEnergyCost} + ${testAttack.convertedEnergyCost}`);
}

const validateWeakness = (weakness, testWeakness) => {
    assert(weakness.type === testWeakness.type, `should have correct type - ${weakness.type} + ${testWeakness.type}`);
    assert(weakness.value === testWeakness.value, `should have correct value - ${weakness.value} + ${testWeakness.value}`);
}

const validateResistance = (resistance, testResistance) => {
    assert(resistance.type === testResistance.type, `should have correct type - ${resistance.type} + ${testResistance.type}`);
    assert(resistance.value === testResistance.value, `should have correct value - ${resistance.value} + ${testResistance.value}`);
}

const validateSet = (set, testSet) => {
    assert(set instanceof Set, `should return a Set instance - ${set} + ${testSet}`);
    assert(set.id === testSet.id, `should have correct id - ${set.id} + ${testSet.id}`);
    assert(set.name === testSet.name, `should have correct name - ${set.name} + ${testSet.name}`);
    assert(set.series === testSet.series, `should have correct series - ${set.series} + ${testSet.series}`);
    assert(set.printedTotal === testSet.printedTotal, `should have correct printedTotal - ${set.printedTotal} + ${testSet.printedTotal}`);
    assert(set.total === testSet.total, `should have correct total - ${set.total} + ${testSet.total}`);
    assert(set.legalities, `should have legalities - ${set.legalities} + ${testSet.legalities}`);
    validateLegalities(set.legalities, testSet.legalities);
    assert(set.ptcgoCode === testSet.ptcgoCode, `should have correct ptcgoCode - ${set.ptcgoCode} + ${testSet.ptcgoCode}`);
    assert(set.releaseDate === testSet.releaseDate, `should have correct releaseDate - ${set.releaseDate} + ${testSet.releaseDate}`);
    assert(set.updatedAt === testSet.updatedAt, `should have correct updatedAt - ${set.updatedAt} + ${testSet.updatedAt}`);
    if (testSet.images) {
        assert(set.images.symbol === testSet.images.symbol, `should have correct symbol - ${set.images.symbol} + ${testSet.images.symbol}`);
        assert(set.images.logo === testSet.images.logo, `should have correct logo - ${set.images.logo} + ${testSet.images.logo}`);
    }
}

const validateLegalities = (legalities, testLegalities) => {
    // Check if at least one of the legalities properties exists
    const hasAnyLegality = legalities.unlimited || legalities.standard || legalities.expanded;
    const testHasAnyLegality = testLegalities.unlimited || testLegalities.standard || testLegalities.expanded;
    
    assert(hasAnyLegality === testHasAnyLegality, `should have at least one legality property - ${JSON.stringify(legalities)} + ${JSON.stringify(testLegalities)}`);
    
    // If they exist, validate them
    if (testLegalities.unlimited) {
        assert(legalities.unlimited === testLegalities.unlimited, `should have correct legalities.unlimited - ${legalities.unlimited} + ${testLegalities.unlimited}`);
    }
    if (testLegalities.standard) {
        assert(legalities.standard === testLegalities.standard, `should have correct legalities.standard - ${legalities.standard} + ${testLegalities.standard}`);
    }
    if (testLegalities.expanded) {
        assert(legalities.expanded === testLegalities.expanded, `should have correct legalities.expanded - ${legalities.expanded} + ${testLegalities.expanded}`);
    }
}

const validateTCGPlayer = (tcgplayer, testTCGPlayer) => {
    assert(tcgplayer.url === testTCGPlayer.url, `should have correct url - ${tcgplayer.url} + ${testTCGPlayer.url}`);
    assert(tcgplayer.updatedAt === testTCGPlayer.updatedAt, `should have correct updatedAt - ${tcgplayer.updatedAt} + ${testTCGPlayer.updatedAt}`);
    validateTCGPlayerPrice(tcgplayer.prices, testTCGPlayer.prices);
}

const validateTCGPlayerPrice = (prices, testPrices) => {
    assert(prices.low === testPrices.low, `should have correct low price - ${prices.low} + ${testPrices.low}`);
    assert(prices.mid === testPrices.mid, `should have correct mid price - ${prices.mid} + ${testPrices.mid}`);
    assert(prices.high === testPrices.high, `should have correct high price - ${prices.high} + ${testPrices.high}`);
    assert(prices.market === testPrices.market, `should have correct market price - ${prices.market} + ${testPrices.market}`);
    assert(prices.directLow === testPrices.directLow, `should have correct directLow price - ${prices.directLow} + ${testPrices.directLow}`);
}

const validateCardMarket = (cardmarket, testCardMarket) => {
    // Prices are in euros
    assert(cardmarket.url === testCardMarket.url, `should have correct url - ${cardmarket.url} + ${testCardMarket.url}`);
    assert(cardmarket.updatedAt === testCardMarket.updatedAt, `should have correct updatedAt - ${cardmarket.updatedAt} + ${testCardMarket.updatedAt}`);
    validateCardMarketPrice(cardmarket.prices, testCardMarket.prices);
}

const validateCardMarketPrice = (prices, testPrices) => {
    assert(prices.averageSellPrice === testPrices.averageSellPrice, `should have correct averageSellPrice - ${prices.averageSellPrice} + ${testPrices.averageSellPrice}`);
    assert(prices.lowPrice === testPrices.lowPrice, `should have correct lowPrice - ${prices.lowPrice} + ${testPrices.lowPrice}`);
    assert(prices.trendPrice === testPrices.trendPrice, `should have correct trendPrice - ${prices.trendPrice} + ${testPrices.trendPrice}`);
    assert(prices.germanProLow === testPrices.germanProLow, `should have correct germanProLow - ${prices.germanProLow} + ${testPrices.germanProLow}`);
    assert(prices.suggestedPrice === testPrices.suggestedPrice, `should have correct suggestedPrice - ${prices.suggestedPrice} + ${testPrices.suggestedPrice}`);
    assert(prices.reverseHoloLow === testPrices.reverseHoloLow, `should have correct reverseHoloLow - ${prices.reverseHoloLow} + ${testPrices.reverseHoloLow}`);
    assert(prices.reverseHoloTrend === testPrices.reverseHoloTrend, `should have correct reverseHoloTrend - ${prices.reverseHoloTrend} + ${testPrices.reverseHoloTrend}`);
    assert(prices.lowPriceExPlus === testPrices.lowPriceExPlus, `should have correct lowPriceExPlus - ${prices.lowPriceExPlus} + ${testPrices.lowPriceExPlus}`);
    assert(prices.avg1 === testPrices.avg1, `should have correct avg1 - ${prices.avg1} + ${testPrices.avg1}`);
    assert(prices.avg7 === testPrices.avg7, `should have correct avg7 - ${prices.avg7} + ${testPrices.avg7}`);
    assert(prices.avg30 === testPrices.avg30, `should have correct avg30 - ${prices.avg30} + ${testPrices.avg30}`);
    assert(prices.reverseHoloAvg1 === testPrices.reverseHoloAvg1, `should have correct reverseHoloAvg1 - ${prices.reverseHoloAvg1} + ${testPrices.reverseHoloAvg1}`);
    assert(prices.reverseHoloAvg7 === testPrices.reverseHoloAvg7, `should have correct reverseHoloAvg7 - ${prices.reverseHoloAvg7} + ${testPrices.reverseHoloAvg7}`);
    assert(prices.reverseHoloAvg30 === testPrices.reverseHoloAvg30, `should have correct reverseHoloAvg30 - ${prices.reverseHoloAvg30} + ${testPrices.reverseHoloAvg30}`);
}

export { validateCard, validateSet, validateLegalities, validateTCGPlayer, 
    validateTCGPlayerPrice, validateCardMarket, validateCardMarketPrice,
    validateArray, validateAncientTrait, validateAbility, validateAttack,
    validateWeakness, validateResistance, };