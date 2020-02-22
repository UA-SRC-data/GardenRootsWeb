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
        if (typeof value === "number") {
            return this.colorScale(value);
        }else {
            return this.colorScale(value.properties.averages[this.mineral]);
        }
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

    getNumberOfSamplePoint(value){
        return value.properties.numPoints;
    }

    getAllSampleData(value){// todo we may call it sample
        return value.properties.values[this.mineral];
    }

    getSampleAverage(value){
        return value.properties.averages[this.mineral];
    }

    getSampleMedian(value){
        let values = this.getAllSampleData(value);
        values.sort((a, b) => a - b);
        let lowMiddle = Math.floor((values.length - 1) / 2);
        let highMiddle = Math.ceil((values.length - 1) / 2);
        return (values[lowMiddle] + values[highMiddle]) / 2;
    }
}