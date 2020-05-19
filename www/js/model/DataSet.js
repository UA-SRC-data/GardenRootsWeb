/**
 * This class represents a data set
 */
class DataSet {

    /**@member {string} - name of this data set*/
    name;
    /**@member {string} - path of this data set*/
    dataPath;
    /**@member {{string: number}} - path of this data set*/
    refValues;
    /**@member {Array.<DataPoints>}  */
    dataPoints = [];
    /**@member {number[]} */
    LegendSample = [20, 10, 5, 2, 1];


    /**@member {ColorScales} */
    colorScales;
    /**@member {SizeScales} */
    sizeScales;

    /**
     * This is the constructor
     * @param {string} setName
     * @param {string} setPath
     * @param {{string: number}} refValues
     */
    constructor(setName, setPath, refValues) {
        this.name = setName;
        this.refValues = refValues;
        this.dataPath = setPath;
        this.colorScales = new ColorScales(refValues);
        this.sizeScales = new SizeScales();
    }

    /**
     * This callback type is called `getDataCallback`
     * It is supposed to visualize the data on map
     *
     * @callback getDataCallback
     * @param {dataPointWithAssociatedInfo[]} data
     */

    /**
     * This function collects data and calls the call back function to produce the visualization
     * @param {string} contaminant
     * @param {getDataCallback} callback
     * @param {function} [filter]
     * @deprecated
     */
    setUpPoints(contaminant, callback, filter) {
        this.setUpPointsByCounty(contaminant, Model.availableCounties.all, callback, filter)
    }

    /**
     * This function collects data and calls the call back function to produce the visualization
     * @param {string} contaminant
     * @param {string} county
     * @param {getDataCallback} callback
     * @param {function} [filter]
     */
    setUpPointsByCounty(contaminant, county, callback, filter) {
        if (this.dataPoints.length === 0) {
            d3.json(this.dataPath).then((data) => {
                for (let i = 0; i < data.length; i++) {
                    this.dataPoints.push(new DataPoints(data[i], this.colorScales, this.sizeScales))
                }
                this.setUpPointsByCounty(contaminant, county, callback, filter);
            });
            return;
        }
        if (county !== Model.availableCounties.all) {
            callback(this.dataPoints
                .filter(point => point.county === county)
                .map(point => point.getData(contaminant, filter))
                .filter(x => x !== null));
        } else {
            callback(this.dataPoints
                .map(point => point.getData(contaminant, filter))
                .filter(x => x !== null));
        }

    }

    /**
     * This function returns the refValue of given contaminant.
     *
     * @param {string} contaminant
     * @return {number}
     */
    getRefValue(contaminant) {
        return this.refValues[contaminant];
    }

    /**
     * This function returns the max value of given contaminant.
     *
     * @param {string} contaminant
     * @return {number}
     */
    getMaxValues(contaminant) {
        return Model.maxes[contaminant];
    }

    /**
     * This function calls sizeScales to calculate the size corresponding to given contaminant and value
     *
     * @param {string} contaminant
     * @param {number} value
     * @return {number}
     */
    calculateSize(contaminant, value) {
        return this.sizeScales.calculateSize(contaminant, value);
    }

    /**
     * This function calls colorScales to calculate the color corresponding to given contaminant and value.
     *
     * @param {string} contaminant
     * @param {number} value
     * @return {string}
     */
    calculateColor(contaminant, value) {
        return this.colorScales.calculateColor(contaminant, value);
    }

    /**
     * This function checks if this data set has the given contaminant
     *
     * @param {string} contaminant
     * @return {boolean}
     */
    isContaminantAvailable(contaminant) {
        return this.refValues.hasOwnProperty(contaminant);
    }

    /**
     * This function produces an array of legend points
     *
     * @param {String} contaminant
     * @return {{sample: number, r: number}[]}
     */
    getLegendPoints(contaminant) {
        let data = [];
        for (let i = 0; i < this.LegendSample.length; i++) {
            data.push({
                sample: this.LegendSample[i],
                r: this.sizeScales.calculateSize(contaminant, this.LegendSample[i])
            })
        }
        return data;
    }
}