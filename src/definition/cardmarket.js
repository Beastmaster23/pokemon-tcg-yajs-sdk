/**
 * CardMarket class representing CardMarket.com data for a card
 * Contains pricing information and URLs for CardMarket listings
 */

class CardMarket {
    /**
     * Creates a new CardMarket instance
     * @param {Object} data - The CardMarket data from the API
     */
    constructor(data) {
        if (!data) {
            this.url = '';
            this.updatedAt = '';
            this.prices = new CardMarketPrices({});
            return;
        }
        this.url = data.url || '';
        this.updatedAt = data.updatedAt || '';
        this.prices = new CardMarketPrices(data.prices || {});
    }
}

/**
 * CardMarketPrices class representing different price points for a card on CardMarket
 * Includes various price metrics for both regular and reverse holo cards
 */
class CardMarketPrices {
    /**
     * Creates a new CardMarketPrices instance
     * @param {Object} data - The price data from the API
     */
    constructor(data) {
        this.averageSellPrice = data.averageSellPrice || -1;
        this.lowPrice = data.lowPrice || -1;
        this.trendPrice = data.trendPrice || -1;
        this.germanProLow = data.germanProLow || -1;
        this.suggestedPrice = data.suggestedPrice || -1;
        this.reverseHoloSell = data.reverseHoloSell || -1;
        this.reverseHoloLow = data.reverseHoloLow || -1;
        this.reverseHoloTrend = data.reverseHoloTrend || -1;
        this.lowPriceExPlus = data.lowPriceExPlus || -1;
        this.avg1 = data.avg1 || -1;
        this.avg7 = data.avg7 || -1;
        this.avg30 = data.avg30 || -1;
        this.reverseHoloAvg1 = data.reverseHoloAvg1 || -1;
        this.reverseHoloAvg7 = data.reverseHoloAvg7 || -1;
        this.reverseHoloAvg30 = data.reverseHoloAvg30 || -1;
    }

    /**
     * Checks if all price values are empty (-1)
     * @returns {boolean} True if all prices are empty
     */
    empty() {
        return this.averageSellPrice === -1 && this.lowPrice === -1 && this.trendPrice === -1 && this.germanProLow === -1 && this.suggestedPrice === -1 && this.reverseHoloSell === -1 && this.reverseHoloLow === -1 && this.reverseHoloTrend === -1 && this.lowPriceExPlus === -1 && this.avg1 === -1 && this.avg7 === -1 && this.avg30 === -1 && this.reverseHoloAvg1 === -1 && this.reverseHoloAvg7 === -1 && this.reverseHoloAvg30 === -1;
    }
}

export default CardMarket;