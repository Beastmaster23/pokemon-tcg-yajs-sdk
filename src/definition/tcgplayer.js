/**
 * TCGPlayer class representing TCGPlayer.com data for a card
 * Contains pricing information and URLs for TCGPlayer listings
 */

class TCGPlayer {
    /**
     * Creates a new TCGPlayer instance
     * @param {Object} data - The TCGPlayer data from the API
     */
    constructor(data) {
        if (!data) {
            this.url = '';
            this.updatedAt = '';
            this.prices = new TCGPlayerPrices({});
            return;
        }
        this.url = data.url || '';
        this.updatedAt = data.updatedAt || '';
        this.prices = new TCGPlayerPrices(data.prices || {});
    }
}

/**
 * TCGPlayerPrices class representing different price points for a card on TCGPlayer
 * Includes low, mid, high, market, and direct low prices
 */
class TCGPlayerPrices {
    /**
     * Creates a new TCGPlayerPrices instance
     * @param {Object} data - The price data from the API
     */
    constructor(data) {
        this.low = data.low || -1;
        this.mid = data.mid || -1;
        this.high = data.high || -1;
        this.market = data.market || -1;
        this.directLow = data.directLow || -1;
    }

    /**
     * Checks if all price values are empty (-1)
     * @returns {boolean} True if all prices are empty
     */
    empty() {
        return this.low === -1 && this.mid === -1 && this.high === -1 && this.market === -1 && this.directLow === -1;
    }

    /**
     * Gets the price for a specific type
     * @param {string} type - The price type ('low', 'mid', 'high', 'market', 'directLow')
     * @returns {number} The price value or -1 if not found
     */
    getPrice(type) {
        switch (type) {
            case 'low':
                return this.low;
            case 'mid':
                return this.mid;
            case 'high':
                return this.high;
            case 'market':
                return this.market;
            case 'directLow':
                return this.directLow;
            default:
                return -1;
        }
    }
}

export default TCGPlayer;