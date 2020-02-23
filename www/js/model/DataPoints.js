class DataPoints{

    dataSet;
    contaminant;
    colorScale;
    sizeScale;
    LegendSample = [20, 10, 5, 2, 1];

    constructor(dataSet, contaminant, colorScale, sizeScale){
        this.dataSet = dataSet;
        this.contaminant = contaminant;
        this.colorScale = colorScale;
        this.sizeScale = sizeScale;
    }

    calculateSize(value){
        return this.sizeScale(value.properties.numPoints);
    }

    calculateColor(value){// I call it value because it can be a number or object
        if (typeof value === "number") {
            return this.colorScale(value);
        }else {
            return this.colorScale(value.properties.averages[this.contaminant]);
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

    getNumberOfSamplePoint(value){// for consistency, I just call it value.
        return value.properties.numPoints;
    }

    getAllSampleData(value){
        return value.properties.values[this.contaminant];
    }

    getSampleAverage(value){
        return value.properties.averages[this.contaminant];
    }

    getSampleMedian(value){
        let values = this.getAllSampleData(value);
        values.sort((a, b) => a - b);
        let lowMiddle = Math.floor((values.length - 1) / 2);
        let highMiddle = Math.ceil((values.length - 1) / 2);
        return (values[lowMiddle] + values[highMiddle]) / 2;
    }

    getSampleExceed(value){
        let values = this.getAllSampleData(value);
        let exceeds = 0;
        for (let i = 0; i < values.length; i++){
            if (values[i] >= Model.SRLS[this.contaminant]){  // todo why just use SRLS?????????????????????????????
                exceeds++;
            }
        }
        return exceeds/(values.length)*100;
    }
}