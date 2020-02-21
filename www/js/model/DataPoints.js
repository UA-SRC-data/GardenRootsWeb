class DataPoints{

    dataSet;
    mineral;
    colorScale;
    sizeScale;
    LegendSample = [20, 10, 5, 2, 1];

    constructor(dataSet, mineral, colorScale, sizeScale){
        this.dataSet = dataSet;
        this.mineral = mineral;
        this.colorScale = colorScale;
        this.sizeScale = sizeScale;
    }

    calculateSize(value){
        return this.sizeScale(value.properties.numPoints);
    }

    calculateColor(value){
        return this.colorScale(value.properties.averages[this.mineral]);
    }

    getLegendPoints(){
        let data=[];
        for (let i=0; i<this.LegendSample.length; i++){
            data.push({
                sample: this.LegendSample[i],
                r:this.sizeScale(this.LegendSample[i])
            })
        }
        return data;
    }
}