/**
 * @typedef {{coordinates: Number[], samples: {String: Number[]}}} dataPoint
 */

/**
 * @typedef {{coordinates: Number[],
 *            samples: Number[],
 *            numPoints: Number,
 *            average: Number,
 *            median: Number,
 *            exceed: Number,
 *            max: Number,
 *            color: String,
 *            size: Number
 *            }} dataPointWithAssociatedInfo
 */


/**
 * This class represents a circle in the map
 */
class DataPoints{

    colorScale;
    sizeScale;
    /** @member {dataPoint} */
    data;
    LegendSample = [20, 10, 5, 2, 1];// todo move to data set layer

    constructor(rawData, colorScale, sizeScale){
        this.data = this.processData(rawData);
        this.colorScale = colorScale;
        this.sizeScale = sizeScale;
    }

    processData(rawData){
        return {
            coordinates: rawData.coordinates,
            samples: rawData.properties.values
        }
    }

    /**
     *
     * @param contaminant
     * @param callback
     */
    getData(contaminant, callback){
        let contaminantSamples = this.data.samples[contaminant];
        let average = contaminantSamples.reduce((a, b) => a + b, 0) / contaminantSamples.length;
        /** @type dataPointWithAssociatedInfo*/
        let data = {
            coordinates: this.data.coordinates,
            samples: contaminantSamples,
            numPoints: this.data.samples[contaminant].length,
            average: contaminantSamples.reduce((a, b) => a + b, 0) / contaminantSamples.length,
            median: this.getMedian(contaminantSamples),
            exceed: this.getExceed(contaminant, contaminantSamples),
            max: Math.max(...contaminantSamples),
            color: this.colorScale(average),
            size: this.sizeScale( this.data.samples[contaminant].length)
        };
        callback(data);
    }

    getMedian(arr){
        arr.sort((a, b) => a - b);
        let lowMiddle = Math.floor((arr.length - 1) / 2);
        let highMiddle = Math.ceil((arr.length - 1) / 2);
        return (arr[lowMiddle] + arr[highMiddle]) / 2;
    }

    getExceed(contaminant, arr){
        let exceeds = 0;
        for (let i = 0; i < arr.length; i++){
            if (arr[i] >= Model.SRLS[contaminant]){  // todo why just use SRLS?????????????????????????????
                exceeds++;
            }
        }
        return exceeds/(arr.length)*100;
    }


    calculateColor(value){// I call it value because it can be a number or object
        return this.colorScale(value);
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