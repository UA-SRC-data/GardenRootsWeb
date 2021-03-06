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
 *            color: string,
 *            size: number,
 *            county: string
 *            }} dataPointWithAssociatedInfo
 */


/**
 * This class represents a circle in the map.
 */
class DataPoint{

    /** @member {ColorScales}*/
    colorScales;
    /** @member {SizeScales}*/
    sizeScales;
    /** @member {dataPoint} */
    data;
    /** @member {string} */
    county;

    /**
     * This is the constructor.
     *
     * @param {Object} rawData
     * @param {ColorScales} colorScales
     * @param {SizeScales} sizeScales
     */
    constructor(rawData, colorScales, sizeScales){
        this.data = this.processData(rawData);
        this.colorScales = colorScales;
        this.sizeScales = sizeScales;
        if (rawData.properties.points.length ===0) {
            this.county = ""
        }else {
            this.county = rawData.properties.points[0].properties.County;
        }
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
     * @param {filterPoints} [filter]
     * @return {(null | dataPointWithAssociatedInfo)}
     */
    getData(contaminant, filter){
        let contaminantSamples = this.data.samples[contaminant].filter((v)=> v!==null);
        if (contaminantSamples.length === 0) {
            return null;
        }
        if (filter !== undefined){
            contaminantSamples = contaminantSamples.filter(filter);
        }
        let average = contaminantSamples.reduce((a, b) => a + b, 0) / contaminantSamples.length;
        return {
            coordinates: this.data.coordinates,
            samples: contaminantSamples,
            numPoints: contaminantSamples.length,
            average: average,
            median: this.getMedian(contaminantSamples),
            exceed: this.getExceed(contaminant, contaminantSamples),
            max: Math.max(...contaminantSamples),
            color: this.calculateColor(contaminant, average),
            size: this.calculateSize(contaminant, contaminantSamples.length),
            county: ""
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
     * @param {String} contaminant - a name of contaminant.
     * @param {number} value - the number of samples points in the area.
     * @return {number}
     */
    calculateSize(contaminant, value) {
        return this.sizeScales.calculateSize(contaminant, value)
    }

    /**
     * This function calculates the size of circles.
     *
     * @param {String} contaminant - a name of contaminant
     * @param {number} value - the average of samples in the area.
     * @return {string}
     */
    calculateColor(contaminant, value){
        return this.colorScales.calculateColor(contaminant, value);
    }
}