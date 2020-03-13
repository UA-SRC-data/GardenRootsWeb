class SizeScales{
    static defaultDomain = [1, 5];
    static defaultRange = [1, 5];

    scales = {};

    constructor() {
    }

    calculateSize(contaminant, value) {
        if (!this.scales.hasOwnProperty(contaminant)){
            this.scales[contaminant] = d3.scaleLinear().domain(SizeScales.defaultDomain).range(SizeScales.defaultRange);
        }
        return this.scales[contaminant](value);
    }
}