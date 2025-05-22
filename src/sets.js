import configuration from './configure.js';
import apiClient from './api-client.js';
import Set from './definition/set.js';

/**
 * Find a set by id
 * @param {string} id - The id of the set to find
 * @param {string[]} select - The fields to return
 * @returns {Promise<Set>} - The set with the given id and the fields specified
 */
const find = async (id, select = []) => {
    const url = `${configuration.baseUrl}/sets/${id}`;
    const queryParams = select.length > 0 ? `?select=${select.join(',')}` : '';
    const response = await fetch(`${url}${queryParams}`, apiClient.getHeaderOptions());
    const data = await response.json();
    return new Set(data.data);
}

/**
 * Find sets by query
 * @param {string} query - The query to find sets
 * @param {number} page - The page number
 * @param {number} pageSize - The page size
 * @param {string[]} orderBy - The order by
 * @param {string[]} select - The fields to return
 * @returns {Promise<Set[]>} - The sets with the given query and the fields specified
 */
const where = async (query, page = 1, pageSize = 250, orderBy = [], select = []) => {
    const data = await apiClient.getData('sets', {
        page: page,
        pageSize: pageSize,
        orderBy: orderBy.join(','),
        q: query,
        select: select.join(',')
    });
    return data.map(set => new Set(set));
}

/**
 * Get all sets
 * @param {string} query - The query to find sets
 * @param {number} page - The page number
 * @param {number} pageSize - The page size
 * @param {string[]} orderBy - The order by
 * @param {string[]} select - The fields to return
 * @returns {Promise<Set[]>} - The sets with the given query and the fields specified
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
        if (query) {
            queryParams.q = Object.entries(query).map(([key, value]) => `${key}:${value}`).join(',');
        }
        if (select.length > 0) {
            queryParams.select = select.join(',');
        }
        const response = await apiClient.get('sets', queryParams);
        const json = await response.json();
        data = data.concat(json.data);
        if (!json.totalCount || (pageSize * page) >= json.totalCount) {
            break;
        }
        page++;
    }
    return data.map(set => new Set(set));
}

export default {
    find,
    where,
    all
}