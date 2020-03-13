class ColorScales{
    static allColors = ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#0c2c84'];

    static colors = Model.colors;
    static maxColor = Model.maxColor;
    static defaultColor = Model.defaultColor;


    refValues;
    scales = {};

    constructor(refValues) {
        this.refValues = refValues;
    }

    calculateColor(contaminant, value) {
        if (!this.scales.hasOwnProperty(contaminant)){
            this.scales[contaminant] = this.generateColorScale(contaminant);
        }
        return this.scales[contaminant](value);
    }

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