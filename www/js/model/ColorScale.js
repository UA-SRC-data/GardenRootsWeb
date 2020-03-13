class ColorScale{
    static allColors = ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#0c2c84'];

    static colors = Model.colors;
    static maxColor = Model.maxColor;
    static defaultColor = Model.defaultColor;


    refValues;
    scales = {};

    constructor(refValues) {
        this.refValues = refValues;
    }

    getColorScale(contaminant) {
        if (!this.scales.hasOwnProperty(contaminant)){
            this.scales[contaminant] = this.generateColorScale(contaminant);
        }
        return this.scales[contaminant];
    }

    generateColorScale(contaminant) {
        if (this.refValues.hasOwnProperty(contaminant)) {
            let colorScale = d3.scaleLinear().domain([0, this.refValues[contaminant]]).range(ColorScale.colors);
            return (value) => {
                if (value > this.refValues[contaminant]) {
                    return ColorScale.maxColor;
                } else {
                    return colorScale(value);
                }
            };
        }
        return d3.scaleLinear().domain([0, Model.maxes[contaminant]]).range(ColorScale.defaultColor);
    }

}