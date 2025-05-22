/**
 * Cards API module for Pokemon TCG
 * Provides functionality to search and retrieve Pokemon TCG cards
 */

import configuration from './configure.js';
import apiClient from './api-client.js';
import Card from './definition/card.js';
/**
 * Find a card by id 
 * @doc https://docs.pokemontcg.io/api-reference/cards/get-card
 * @param {string} id - The id of the card to find
 * @param {string[]} select - The fields to return
 * @returns {Promise<Card>} - The card with the given id and the fields specified
 */
const find = async (id, select = []) => {
    const url = `${configuration.baseUrl}/cards/${id}`;
    const queryParams = select.length > 0 ? `?select=${select.join(',')}` : '';
    const response = await fetch(`${url}${queryParams}`, apiClient.getHeaderOptions());
    const data = await response.json();
    return new Card(data.data);
}

/**
 * Find cards by query
 * @doc https://docs.pokemontcg.io/api-reference/cards/get-cards
 * @param {string} query - The query to find cards
 * @param {number} page - The page number
 * @param {number} pageSize - The page size
 * @param {string[]} orderBy - The order by
 * @param {string[]} select - The fields to return
 * @returns {Promise<Card[]>} - The cards with the given query and the fields specified
 */
const where = async (query, page = 1, pageSize = 250, orderBy = [], select = []) => {
    const data = await apiClient.getData('cards', {
        page: page,
        pageSize: pageSize,
        orderBy: orderBy.join(','),
        q: query,
        select: select.join(',')
    });
    return data.map(card => new Card(card));
}

/**
 * Retrieve all cards matching the query criteria
 * @param {Object} query - The query parameters to filter cards
 * @param {string[]} orderBy - Fields to order the results by
 * @param {string[]} select - Fields to include in the response
 * @param {number} pageSize - Number of items per page
 * @returns {Promise<Array>} Array of all matching cards
 */
const all = async (query = {}, orderBy = [], select = [], pageSize = 250) => {
    let page = 1;
    let data = [];
    while (true) {
        const queryParams = {
            page: page,
            pageSize: pageSize,
        };
        if (orderBy.length > 0) {
            queryParams.orderBy = orderBy.join(',');
        }
        if (select.length > 0) {
            queryParams.select = select.join(',');
        }
        if (query) {
            queryParams.q = Object.entries(query).map(([key, value]) => `${key}:${value}`).join(',');
        }
        const response = await apiClient.get('cards', queryParams);
        const json = await response.json();
        data = data.concat(json.data);
        if (!response.totalCount || (pageSize * page) >= response.totalCount) {
            break;
        }
        page++;
    }
    return data;
}

export default {
    find,
    where,
    all
}