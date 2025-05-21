/**
 * AncientTrait class representing an ancient trait on a Pokemon card
 * Ancient traits are special abilities that were introduced in the Ancient Origins set
 */

class AncientTrait {
    /**
     * Creates a new AncientTrait instance
     * @param {Object} data - The ancient trait data from the API
     * @param {string} data.name - The name of the ancient trait
     * @param {string} data.text - The description of the ancient trait's effect
     */
    constructor(data) {
        this.name = data.name;
        this.text = data.text;
    }
}

export default AncientTrait;