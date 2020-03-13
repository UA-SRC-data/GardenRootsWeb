/**
 * This class manages size scales.
 */
class SizeScales{
    /** @type {number[]}*/
    static defaultDomain = [1, 5];
    /** @type {number[]}*/
    static defaultRange = [1, 5];

    /** @member {{string: function}} scales */
    scales = {};

    /**
     * This is the constructor.
     */
    constructor() {
    }

    /**
     * Call this function to calculate the size of circle of given contaminant and value
     *
     * @param {string} contaminant
     * @param {number} value
     * @return {number}
     */
    calculateSize(contaminant, value) {
        if (!this.scales.hasOwnProperty(contaminant)){
            this.scales[contaminant] = d3.scaleLinear().domain(SizeScales.defaultDomain).range(SizeScales.defaultRange);
        }
        return this.scales[contaminant](value);
    }
}