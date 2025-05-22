/**
 * Helper functions for making API requests to the Pokemon TCG API
 * Provides utilities for handling pagination and data fetching
 */

/**
 * Makes a single GET request to the Pokemon TCG API
 * @param {string} url - The URL to fetch
 * @returns {Promise<Object>} The JSON response from the API
 * @throws {Error} If the request fails
 */
const get = async (url) => {    
    const response = await fetch(url, {
        headers: {
            'X-Api-Key': process.env.POKEMON_TCG_API_KEY
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

/**
 * Makes a GET request to the Pokemon TCG API and returns only the data array
 * @param {string} url - The URL to fetch
 * @returns {Promise<Array>} The data array from the API response
 * @throws {Error} If the request fails
 */
const getData = async (url) => {
    const response = await get(url);
    return response.data;
}

/**
 * Makes a paginated GET request to the Pokemon TCG API
 * @param {string} url - The base URL to fetch
 * @param {number} page - The page number to fetch (default: 1)
 * @param {number} pageSize - The number of items per page (default: 250)
 * @returns {Promise<Object>} The paginated JSON response from the API
 * @throws {Error} If the request fails
 */
const getPaginated = async (url, page = 1, pageSize = 250) => {
    // add query params page and pageSize
    let urlWithParams = url;
    if (!urlWithParams.includes('?')) {
        urlWithParams += '?';
    }
    urlWithParams += `&page=${page}&pageSize=${pageSize}`;
    const response = await fetch(urlWithParams, {
        headers: {
            'X-Api-Key': process.env.POKEMON_TCG_API_KEY
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} ;${urlWithParams}`);
    }
    const data = await response.json();
    return data;
}

/**
 * Fetches all data from a paginated endpoint by making multiple requests
 * @param {string} url - The base URL to fetch
 * @returns {Promise<Array>} Array containing all data from all pages
 */
const getAll = async (url) => {
    let response = await getPaginated(url);
    const data = response.data;
    while (true) {
        response = await getPaginated(url, response.page + 1);
        data.push(...response.data);
        if (!response.totalCount || (response.pageSize * response.page) >= response.totalCount) {
            break;
        }
    }
    return data;
}

export { get, getPaginated, getAll, getData };