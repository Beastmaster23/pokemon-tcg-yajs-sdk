/**
 * Main library module for Pokemon TCG API
 * Provides the main entry point and configuration for the API client
 */

import configuration from './configure.js';
import sets from './sets.js';       
import cards from './cards.js';
import card from './definition/card.js';
import AncientTrait from './definition/ancientTrait.js';
import Set from './definition/set.js';
import legality from './definition/legality.js';
import tcgplayer from './definition/tcgplayer.js';
import cardmarket from './definition/cardmarket.js';
/**
 * Configures the library with the provided API key
 * @param {string} apiKey - The API key to use for authentication
 * @throws {Error} If apiKey is not provided
 */
const configure = (apiKey) => {
    if (!apiKey) {
        throw new Error('apiKey is required');
    }
    configuration.setApiKey(apiKey);
}

/**
 * Main library exports
 * @property {Function} configure - Function to configure the library
 * @property {Object} sets - Sets API functionality
 * @property {Object} cards - Cards API functionality
 * @property {Object} types - Type definitions for API responses
 */
export default {
    configure,
    cards,
    sets,
    types: {
        card,
        Set,
        legality,
        tcgplayer,
        cardmarket,
        AncientTrait,
    },
};