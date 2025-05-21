# YA Pokemon TCG SDK (Yet Another Pokemon TCG SDK)

A modern JavaScript SDK for interacting with the Pokemon Trading Card Game API. This is "Yet Another" implementation of the Pokemon TCG SDK, providing a more intuitive interface and additional features for accessing Pokemon TCG card data, set information, and market prices.

## Why Another SDK?

While there are existing Pokemon TCG SDKs (like the original [pokemon-tcg-sdk-javascript](https://github.com/PokemonTCG/pokemon-tcg-sdk-javascript)), this implementation aims to provide:

- 🚀 Modern JavaScript features and async/await syntax
- 📦 ES Modules support
- 🔄 Improved error handling
- 🎯 Better TypeScript support
- 💡 Enhanced documentation
- 🛠️ Additional utility methods
- 🔍 Improved search capabilities
- 💰 Enhanced market data integration

## Features

- 🔍 Search and retrieve Pokemon TCG cards
- 📦 Access set information and details
- 💰 Get card prices from TCGPlayer and CardMarket
- 🎮 Check card legality in different formats
- 🖼️ Access card and set images
- 📊 Comprehensive card data including:
  - Card types and evolution stages
  - Abilities and attacks
  - Weaknesses and resistances
  - Ancient traits
  - Pokedex numbers
  - Artist information
  - Rarity and flavor text

## Installation

```bash
npm install pokemon-tcg-yajs-sdk
```

## Usage

### Configuration

First, you need to configure the SDK with your API key:

```javascript
import pokemon from 'pokemon-tcg-yajs-sdk';

// Configure with your API key
pokemon.configure('your-api-key-here');
```

### Finding Cards

```javascript
// Find a specific card by ID
const card = await pokemon.cards.find('xy7-54');

// Search for cards
const cards = await pokemon.cards.where('name:charizard');

// Get all cards (with optional filters)
const allCards = await pokemon.cards.all({
  q: 'set.id:base1',
  orderBy: 'name'
});
```

### Working with Card Data

```javascript
// Check card type
if (card.isPokemon()) {
  // Check evolution stage
  if (card.isBasic()) {
    console.log('This is a Basic Pokemon');
  }
}

// Get card details
const cardName = card.getName();
const cardType = card.getTypes();
const cardHP = card.hp;
const cardRarity = card.getRarity();

// Check card legality
if (card.isLegal('standard')) {
  console.log('This card is legal in Standard format');
}

// Get card prices
const tcgplayerPrice = card.getPrice('tcgplayer', 'market');
const cardmarketPrice = card.getPrice('cardmarket');

// Get card images
const cardImage = card.getImageUrl('large');
const setSymbol = card.getSetSymbol();
```

### Working with Sets

```javascript
// Find a specific set
const set = await pokemon.types.card.Set.find('base1');

// Get set information
const setName = set.getName();
const setSeries = set.getSeries();
const releaseDate = set.getReleaseDate();
const totalCards = set.getTotal();

// Get set images
const setSymbol = set.getSymbolUrl();
const setLogo = set.getLogoUrl();
```

## API Reference

### Card Methods

#### Type Checking
- `isPokemon()` - Check if card is a Pokemon
- `isTrainer()` - Check if card is a Trainer
- `isEnergy()` - Check if card is an Energy

#### Evolution Stage
- `isBasic()` - Check if card is a Basic Pokemon
- `isStage1()` - Check if card is a Stage 1 Pokemon
- `isStage2()` - Check if card is a Stage 2 Pokemon
- `isV()` - Check if card is a V Pokemon
- `isVMAX()` - Check if card is a VMAX Pokemon
- `isVSTAR()` - Check if card is a VSTAR Pokemon

#### Card Properties
- `hasLevel()` - Check if card has a level
- `hasAncientTrait()` - Check if card has an ancient trait
- `hasRules()` - Check if card has rules text
- `hasAbility()` - Check if card has abilities
- `hasAttack()` - Check if card has attacks
- `hasWeakness()` - Check if card has weaknesses
- `hasResistance()` - Check if card has resistances

#### Game Mechanics
- `isLegal(format)` - Check card legality in a format
- `getWeakness(type)` - Get weakness value for a type
- `getResistance(type)` - Get resistance value for a type
- `getAttackCost(attackIndex)` - Get attack cost
- `getAttackDamage(attackIndex)` - Get attack damage
- `getAttackText(attackIndex)` - Get attack text

#### Market Data
- `getPrice(source, type)` - Get card price from TCGPlayer or CardMarket

#### Images
- `getImageUrl(size)` - Get card image URL
- `getSetSymbol()` - Get set symbol image URL
- `getSetLogo()` - Get set logo image URL

### Set Methods

#### Information
- `getName()` - Get set name
- `getSeries()` - Get set series
- `getReleaseDate()` - Get release date
- `getUpdatedAt()` - Get last update timestamp
- `getPtcgoCode()` - Get PTCGO code

#### Card Counts
- `getPrintedTotal()` - Get total printed cards
- `getTotal()` - Get total cards

#### Images
- `getSymbolUrl()` - Get set symbol URL
- `getLogoUrl()` - Get set logo URL

#### Legality
- `isLegal(format)` - Check set legality in a format
- `getLegalities()` - Get all legality information

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. This project aims to provide a modern, well-maintained alternative to existing Pokemon TCG SDKs.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Original [Pokemon TCG SDK JavaScript](https://github.com/PokemonTCG/pokemon-tcg-sdk-javascript) for inspiration
- Pokemon TCG API for providing the data
- TCGPlayer and CardMarket for price data 