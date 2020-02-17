class colorScale{

    maxValue;
    scale;
    maxColor;

    constructor(domain, range, maxValue, maxColor) {
        this.maxValue = maxValue;
        this.maxColor = maxColor;
        //construct a d3 linear color scale
        this.scale=d3.scaleLinear().domain(domain).range(range)
    }

    getColor(value){
        //if > max value
        if (value>this.maxValue){
            return this.maxColor;
        }
        return this.scale(value)
    }
}