/**
 * Set class representing a Pokemon TCG set
 * Provides methods to access set information and interact with the Pokemon TCG API
 */

class Set {
  /**
   * Creates a new Set instance
   * @param {Object} data - The set data from the API
   */
  constructor(data) {
    this.id = data.id;                    // String
    this.name = data.name;                // String
    this.series = data.series;            // String
    this.printedTotal = data.printedTotal;// Number
    this.total = data.total;              // Number
    this.legalities = data.legalities || {};// Dictionary/Object
    this.ptcgoCode = data.ptcgoCode;      // String
    this.releaseDate = data.releaseDate;  // String
    this.updatedAt = data.updatedAt;      // String
    this.images = data.images || {};      // Dictionary/Object
  }

  // API Methods
  /**
   * Finds a set by its ID
   * @param {string} id - The ID of the set to find
   * @returns {Promise<Set>} The found set
   * @throws {Error} If the set cannot be found
   */
  static async find(id) {
    try {
      const response = await fetch(`https://api.pokemontcg.io/v2/sets/${id}`);
      const data = await response.json();
      return new Set(data.data);
    } catch (error) {
      throw new Error(`Failed to find set with id ${id}: ${error.message}`);
    }
  }

  /**
   * Queries sets based on a search query
   * @param {string} query - The search query
   * @returns {Promise<Set[]>} Array of matching sets
   * @throws {Error} If the query fails
   */
  static async where(query) {
    try {
      const response = await fetch(`https://api.pokemontcg.io/v2/sets?q=${query}`);
      const data = await response.json();
      return data.data.map(setData => new Set(setData));
    } catch (error) {
      throw new Error(`Failed to query sets: ${error.message}`);
    }
  }

  /**
   * Retrieves all sets
   * @returns {Promise<Set[]>} Array of all sets
   * @throws {Error} If the request fails
   */
  static async all() {
    try {
      const response = await fetch('https://api.pokemontcg.io/v2/sets');
      const data = await response.json();
      return data.data.map(setData => new Set(setData));
    } catch (error) {
      throw new Error(`Failed to fetch all sets: ${error.message}`);
    }
  }

  // Legality Methods
  /**
   * Checks if the set is legal in a specific format
   * @param {string} format - The format to check legality for
   * @returns {boolean} True if the set is legal in the format
   */
  isLegal(format) {
    return this.legalities[format] === "Legal";
  }

  // Image Methods
  /**
   * Gets the URL of the set symbol image
   * @returns {string|null} The set symbol image URL
   */
  getSymbolUrl() {
    return this.images.symbol;
  }

  /**
   * Gets the URL of the set logo image
   * @returns {string|null} The set logo image URL
   */
  getLogoUrl() {
    return this.images.logo;
  }

  // Set Information Methods
  /**
   * Gets the name of the set
   * @returns {string} The set name
   */
  getName() {
    return this.name;
  }

  /**
   * Gets the series of the set
   * @returns {string} The set series
   */
  getSeries() {
    return this.series;
  }

  /**
   * Gets the release date of the set
   * @returns {string} The set release date
   */
  getReleaseDate() {
    return this.releaseDate;
  }

  /**
   * Gets the last update timestamp of the set
   * @returns {string} The set update timestamp
   */
  getUpdatedAt() {
    return this.updatedAt;
  }

  /**
   * Gets the PTCGO code of the set
   * @returns {string} The PTCGO code
   */
  getPtcgoCode() {
    return this.ptcgoCode;
  }

  // Card Count Methods
  /**
   * Gets the total number of printed cards in the set
   * @returns {number} The printed total
   */
  getPrintedTotal() {
    return this.printedTotal;
  }

  /**
   * Gets the total number of cards in the set
   * @returns {number} The total
   */
  getTotal() {
    return this.total;
  }

  // Legality Information Methods
  /**
   * Gets the legality information for all formats
   * @returns {Object} The legality information
   */
  getLegalities() {
    return this.legalities;
  }
}

export default Set;
