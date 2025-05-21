/**
 * Legality class representing the legality status of a card in a specific format
 * Used to track whether a card is legal, banned, or restricted in various formats
 */

class Legality {
    /**
     * Creates a new Legality instance
     * @param {Object} data - The legality data from the API
     * @param {string} data.standard - The legality status for Standard format ('legal', 'banned') or field is not present
     * @param {string} data.expanded - The legality status for Expanded format ('legal', 'banned') or field is not present
     * @param {string} data.unlimited - The legality status for Unlimited format ('legal', 'banned') or field is not present
     */
    constructor(data) {
        if (!data) {
            this.standard = '';
            this.expanded = '';
            this.unlimited = '';
            return;
        }
        
        if (data.standard) {
            this.standard = data.standard;
        }
        if (data.expanded) {
            this.expanded = data.expanded;
        }
        if (data.unlimited) {
            this.unlimited = data.unlimited;
        }
    }
}

export default Legality;