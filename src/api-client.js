/**
 * Pokemon TCG API Client
 * This module provides functionality to interact with the Pokemon TCG API
 */

import configuration from './configure.js';

/**
 * Generates header options for API requests, including API key if configured
 * @returns {Object} Request options object with headers
 */
const getHeaderOptions = () => {
    const options = {
        headers: {}
    };

    if (configuration.apiKey)
        options.headers['X-Api-Key'] = configuration.apiKey;

    return options;
}

/**
 * Makes a GET request to the Pokemon TCG API
 * @param {string} type - The API endpoint type to query
 * @param {Object} queryArgs - Optional query parameters for the request
 * @returns {Promise<Array>} The data array from the API response
 */
const getData = async (type, queryArgs = {}) => {
    const url = `${configuration.baseUrl}/${type}`;
    const queryParams = Object.entries(queryArgs).length > 0 ? `?${Object.entries(queryArgs).map(([key, value]) => `${key}=${value}`).join('&')}` : '';
    const response = await fetch(`${url}${queryParams}`, getHeaderOptions());
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} response: ${response.statusText} url: ${url}${queryParams}`);
    }
    const data = await response.json();
    return data.data;
}

const get = async (type, queryArgs = {}) => {
    const url = `${configuration.baseUrl}/${type}`;
    const queryParams = Object.entries(queryArgs).length > 0 ? `?${Object.entries(queryArgs).map(([key, value]) => `${key}=${value}`).join('&')}` : '';
    const response = await fetch(`${url}${queryParams}`, getHeaderOptions());
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} response: ${response.statusText} url: ${url}${queryParams}`);
    }
    return response;
}

export default {
    getHeaderOptions,
    getData,
    get,
}
