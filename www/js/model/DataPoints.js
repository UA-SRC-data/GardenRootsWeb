class DataPoints{

    dataSet;
    mineral;
    colorScale;
    sizeScale;

    constructor(dataSet, mineral, colorScale, sizeScale){
        this.dataSet = dataSet;
        this.mineral = mineral;
        this.colorScale = colorScale;
        this.sizeScale = sizeScale;
    }

    calculateSize(value){
        return this.sizeScale(value);
    }

    calculateColor(value){
        return this.colorScale(value.properties.averages[this.mineral]);
    }
}