/**
 * Card class representing a Pokemon TCG card
 * Provides methods to access and analyze card properties and game mechanics
 */

import Set from './set.js';
import AncientTrait from './ancientTrait.js';
import Legality from './legality.js';
import TCGPlayer from './tcgplayer.js';
import CardMarket from './cardmarket.js';

class Card {
  /**
   * Creates a new Card instance
   * @param {Object} data - The card data from the API
   */
  constructor(data) {
    this.id = data.id;// String
    this.name = data.name;// String
    this.supertype = data.supertype;// String
    this.subtypes = data.subtypes || [];// List/String
    this.level = data.level || "";// String
    this.hp = data.hp || "";// String
    this.types = data.types || [];// List/String
    this.evolvesFrom = data.evolvesFrom || "";// String
    this.evolvesTo = data.evolvesTo || [];// List/String
    this.rules = data.rules || [];// List/String
    if (data.ancientTrait) {
      this.ancientTrait = new AncientTrait(data.ancientTrait);// AncientTrait
    }
    this.abilities = data.abilities || [];// List/Dictionary
    this.attacks = data.attacks || [];// List/Dictionary
    this.weaknesses = data.weaknesses || [];// List/Dictionary
    this.resistances = data.resistances || [];// List/Dictionary
    this.retreatCost = data.retreatCost || [];// List/String
    this.convertedRetreatCost = data.convertedRetreatCost || -1;// Number
    this.set = new Set(data.set);// Set
    this.number = data.number || -1;// Number
    this.artist = data.artist || "";// String
    this.rarity = data.rarity || "";// String
    this.flavorText = data.flavorText || "";// String
    this.nationalPokedexNumbers = data.nationalPokedexNumbers || [];// List/Number
    this.legalities = new Legality(data.legalities);// Legality
    this.images = data.images || {};// Dictionary/Object
    this.tcgplayer = new TCGPlayer(data.tcgplayer);// TCGPlayer
    this.cardmarket = new CardMarket(data.cardmarket);// CardMarket
  }

  // Card Type Methods
  /**
   * Checks if the card is a Pokemon card
   * @returns {boolean} True if the card is a Pokemon
   */
  isPokemon() {
    return this.supertype === "Pokémon";
  }

  /**
   * Checks if the card is a Trainer card
   * @returns {boolean} True if the card is a Trainer
   */
  isTrainer() {
    return this.supertype === "Trainer";
  }

  /**
   * Checks if the card is an Energy card
   * @returns {boolean} True if the card is an Energy
   */
  isEnergy() {
    return this.supertype === "Energy";
  }

  // Evolution Methods
  /**
   * Checks if the card is a Basic Pokemon
   * @returns {boolean} True if the card is a Basic Pokemon
   */
  isBasic() {
    return this.subtypes.includes("Basic");
  }

  /**
   * Checks if the card is a Stage 1 Pokemon
   * @returns {boolean} True if the card is a Stage 1 Pokemon
   */
  isStage1() {
    return this.subtypes.includes("Stage 1");
  }

  /**
   * Checks if the card is a Stage 2 Pokemon
   * @returns {boolean} True if the card is a Stage 2 Pokemon
   */
  isStage2() {
    return this.subtypes.includes("Stage 2");
  }

  /**
   * Checks if the card is a V Pokemon
   * @returns {boolean} True if the card is a V Pokemon
   */
  isV() {
    return this.subtypes.includes("V");
  }

  /**
   * Checks if the card is a VMAX Pokemon
   * @returns {boolean} True if the card is a VMAX Pokemon
   */
  isVMAX() {
    return this.subtypes.includes("VMAX");
  }

  /**
   * Checks if the card is a VSTAR Pokemon
   * @returns {boolean} True if the card is a VSTAR Pokemon
   */
  isVSTAR() {
    return this.subtypes.includes("VSTAR");
  }

  // Card Properties Methods
  /**
   * Checks if the card has a level
   * @returns {boolean} True if the card has a level
   */
  hasLevel() {
    return !!this.level;
  }

  /**
   * Checks if the card has an ancient trait
   * @returns {boolean} True if the card has an ancient trait
   */
  hasAncientTrait() {
    return !!this.ancientTrait;
  }

  /**
   * Checks if the card has rules text
   * @returns {boolean} True if the card has rules
   */
  hasRules() {
    return this.rules.length > 0;
  }

  /**
   * Checks if the card has abilities
   * @returns {boolean} True if the card has abilities
   */
  hasAbility() {
    return this.abilities.length > 0;
  }

  /**
   * Checks if the card has attacks
   * @returns {boolean} True if the card has attacks
   */
  hasAttack() {
    return this.attacks.length > 0;
  }

  /**
   * Checks if the card has weaknesses
   * @returns {boolean} True if the card has weaknesses
   */
  hasWeakness() {
    return this.weaknesses.length > 0;
  }

  /**
   * Checks if the card has resistances
   * @returns {boolean} True if the card has resistances
   */
  hasResistance() {
    return this.resistances.length > 0;
  }

  // Game Mechanics Methods
  /**
   * Checks if the card is legal in a specific format
   * @param {string} format - The format to check legality for
   * @returns {boolean} True if the card is legal in the format
   */
  isLegal(format) {
    return this.legalities[format] === "Legal";
  }

  /**
   * Gets the weakness value for a specific type
   * @param {string} type - The type to check weakness for
   * @returns {string|null} The weakness value or null if not found
   */
  getWeakness(type) {
    return this.weaknesses.find(w => w.type === type)?.value;
  }

  /**
   * Gets the resistance value for a specific type
   * @param {string} type - The type to check resistance for
   * @returns {string|null} The resistance value or null if not found
   */
  getResistance(type) {
    return this.resistances.find(r => r.type === type)?.value;
  }

  /**
   * Gets the cost of a specific attack
   * @param {number} attackIndex - The index of the attack (default: 0)
   * @returns {Array} The cost of the attack
   */
  getAttackCost(attackIndex = 0) {
    return this.attacks[attackIndex]?.cost || [];
  }

  /**
   * Gets the damage of a specific attack
   * @param {number} attackIndex - The index of the attack (default: 0)
   * @returns {string|null} The damage of the attack
   */
  getAttackDamage(attackIndex = 0) {
    return this.attacks[attackIndex]?.damage;
  }

  /**
   * Gets the text of a specific attack
   * @param {number} attackIndex - The index of the attack (default: 0)
   * @returns {string|null} The text of the attack
   */
  getAttackText(attackIndex = 0) {
    return this.attacks[attackIndex]?.text;
  }

  // Market Methods
  /**
   * Gets the price of the card from a specific source
   * @param {string} source - The price source ('tcgplayer' or 'cardmarket')
   * @param {string} type - The price type (for TCGPlayer)
   * @returns {number|null} The price of the card
   */
  getPrice(source = 'tcgplayer', type = 'normal') {
    if (source === 'tcgplayer') {
      return this.tcgplayer?.prices[type]?.market;
    } else if (source === 'cardmarket') {
      return this.cardmarket?.prices?.averageSellPrice;
    }
    return null;
  }

  // Image Methods
  /**
   * Gets the image URL for a specific size
   * @param {string} size - The size of the image ('small', 'large', etc.)
   * @returns {string|null} The image URL
   */
  getImageUrl(size = 'small') {
    return this.images[size];
  }

  /**
   * Gets the set symbol image URL
   * @returns {string|null} The set symbol image URL
   */
  getSetSymbol() {
    return this.set?.images?.symbol;
  }

  /**
   * Gets the set logo image URL
   * @returns {string|null} The set logo image URL
   */
  getSetLogo() {
    return this.set?.images?.logo;
  }

  // Set Information Methods
  /**
   * Gets the name of the set
   * @returns {string|null} The set name
   */
  getSetName() {
    return this.set?.name;
  }

  /**
   * Gets the series of the set
   * @returns {string|null} The set series
   */
  getSetSeries() {
    return this.set?.series;
  }

  /**
   * Gets the release date of the set
   * @returns {string|null} The set release date
   */
  getSetReleaseDate() {
    return this.set?.releaseDate;
  }

  // Card Information Methods
  /**
   * Gets the first Pokedex number of the card
   * @returns {number|null} The Pokedex number
   */
  getPokedexNumber() {
    return this.nationalPokedexNumbers[0];
  }

  /**
   * Gets the artist of the card
   * @returns {string} The artist name
   */
  getArtist() {
    return this.artist;
  }

  /**
   * Gets the rarity of the card
   * @returns {string} The card rarity
   */
  getRarity() {
    return this.rarity;
  }

  /**
   * Gets the flavor text of the card
   * @returns {string} The flavor text
   */
  getFlavorText() {
    return this.flavorText;
  }
}

export default Card;
