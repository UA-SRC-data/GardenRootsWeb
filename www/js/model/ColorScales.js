/**
 * This class manages color scales.
 */
class ColorScales{
    /**@type {string[]}*/
    static allColors = ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#0c2c84'];

    /** @type {[string, string, string, string]} */
    static colors = Model.colors;
    /** @type {string} */
    static maxColor = Model.maxColor;
    /** @type {[string, string]} */
    static defaultColor = Model.defaultColor;


    /** @member {{string: number}} refValues */
    refValues;
    /** @member {{string: function}} scales */
    scales = {};

    /**
     * This is the constructor.
     *
     * @param {{string: number}} refValues
     */
    constructor(refValues) {
        this.refValues = refValues;
    }

    /**
     * Call this function to calculate the color of given contaminant and value
     *
     * @param {String} contaminant
     * @param {number} value
     * @return {string}
     */
    calculateColor(contaminant, value) {
        if (!this.scales.hasOwnProperty(contaminant)){
            this.scales[contaminant] = this.generateColorScale(contaminant);
        }
        return this.scales[contaminant](value);
    }

    /**
     * This function has the rule to create a color scale for given contaminant
     *
     * @param {String} contaminant
     * @return {function}
     */
    generateColorScale(contaminant) {
        if (this.refValues.hasOwnProperty(contaminant)) {
            let colorScale = d3.scaleLinear().domain([0, this.refValues[contaminant]]).range(ColorScales.colors);
            return (value) => {
                if (value > this.refValues[contaminant]) {
                    return ColorScales.maxColor;
                } else {
                    return colorScale(value);
                }
            };
        }
        return d3.scaleLinear().domain([0, Model.maxes[contaminant]]).range(ColorScales.defaultColor);
    }

}