/**
 * Configuration module for Pokemon TCG API
 * Manages API key and base URL settings with validation
 */
export default {
    /** API key for authentication with the Pokemon TCG API */
    apiKey: null,
    /** Base URL for the Pokemon TCG API v2 */
    baseUrl: 'https://api.pokemontcg.io/v2',

    /**
     * Sets the API key for authentication
     * @param {string} apiKey - The API key to use for authentication
     * @throws {Error} If apiKey is not provided
     */
    setApiKey(apiKey) {
        this.apiKey = apiKey;
        if (!this.apiKey) {
            throw new Error('apiKey is required');
        }
    },

    /**
     * Sets and validates the base URL for API requests
     * @param {string} baseUrl - The base URL to use for API requests
     * @throws {Error} If baseUrl is not provided or invalid
     */
    async setBaseUrlSafely(baseUrl) {
        this.baseUrl = baseUrl;
        if (!this.baseUrl) {
            throw new Error('baseUrl is required');
        }
        // check if baseUrl is valid by fetching the baseUrl
        try {
            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error('baseUrl is invalid');
            }
        } catch (error) {
            throw new Error('baseUrl is invalid');
        }
    },
}