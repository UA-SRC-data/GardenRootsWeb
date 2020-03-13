/**
 * @typedef {{coordinates: number[], samples: {String: number[]}}} dataPoint
 */

/**
 * @typedef {{coordinates: number[],
 *            samples: number[],
 *            numPoints: number,
 *            average: number,
 *            median: number,
 *            exceed: number,
 *            max: number,
 *            color: String,
 *            size: number
 *            }} dataPointWithAssociatedInfo
 */


/**
 * This class represents a circle in the map.
 */
class DataPoint{

    /** @member {Function}*/
    colorScale;
    /** @member {Function}*/
    sizeScale;
    /** @member {dataPoint} */
    data;

    /**
     * This is the constructor.
     *
     * @param {Object} rawData
     * @param {Function} colorScale
     * @param {Function} sizeScale
     */
    constructor(rawData, colorScale, sizeScale){
        this.data = this.processData(rawData);
        this.colorScale = colorScale;
        this.sizeScale = sizeScale;
    }

    /**
     * This functions processes raw data
     *
     * @param {Object} rawData
     * @return {dataPoint}
     */
    processData(rawData){
        return {
            coordinates: rawData.coordinates,
            samples: rawData.properties.values
        }
    }



    /**
     * This function produces the data that is necessary for view
     *
     * @param {String} contaminant
     * @return {dataPointWithAssociatedInfo | null}
     */
    getData(contaminant){
        let contaminantSamples = this.data.samples[contaminant].filter((v)=> v!==null);
        if (contaminantSamples.length === 0) {
            return null;
        }
        let average = contaminantSamples.reduce((a, b) => a + b, 0) / contaminantSamples.length;
        /** @type dataPointWithAssociatedInfo*/
        return {
            coordinates: this.data.coordinates,
            samples: contaminantSamples,
            numPoints: this.data.samples[contaminant].length,
            average: contaminantSamples.reduce((a, b) => a + b, 0) / contaminantSamples.length,
            median: this.getMedian(contaminantSamples),
            exceed: this.getExceed(contaminant, contaminantSamples),
            max: Math.max(...contaminantSamples),
            color: this.calculateColor(average),
            size: this.calculateSize(this.data.samples[contaminant].length)
        };
    }

    /**
     * This function calculates the median of the samples
     *
     * @param {number[]} arr
     * @return {number}
     */
    getMedian(arr){
        arr.sort((a, b) => a - b);
        let lowMiddle = Math.floor((arr.length - 1) / 2);
        let highMiddle = Math.ceil((arr.length - 1) / 2);
        return (arr[lowMiddle] + arr[highMiddle]) / 2;
    }

    /**
     * This functions calculate the percentage of exceeding.
     *
     * @param {String} contaminant
     * @param {number[]} arr - a array of samples
     * @return {number} - the percentage of exceeding.
     */
    getExceed(contaminant, arr){
        let exceeds = 0;
        for (let i = 0; i < arr.length; i++){
            if (arr[i] >= Model.SRLS[contaminant]){  // todo why just use SRLS?????????????????????????????
                exceeds++;
            }
        }
        return exceeds/(arr.length)*100;
    }

    /**
     * This function calculates the color of circles.
     *
     * @param {number} value - the number of samples points in the area.
     * @return {number}
     */
    calculateSize(value) {
        return this.sizeScale(value)
    }

    /**
     * This function calculates the size of circles.
     *
     * @param {number} value - the average of samples in the area.
     * @return {string}
     */
    calculateColor(value){
        return this.colorScale(value);
    }
}