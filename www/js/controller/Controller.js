/**
 * This class is the controller for this data visualization.
 * All data accesses by view need to be done by calling functions in controller instead of directly call to model.
 * @property {Model} model                    - a model instance is passed through constructor.
 * @property {BackGroundMap} BackGroundMap    - a BackGroundMap instance
 * @property {DataSet} currentDataSet         - a instance of DataSet obj
 * @property {DataPoints} currentDataPoint    - a instance of DataPoint obj
 */
class Controller {

    model; // a model instance is passed through constructor.
    backgroundMap; // a BackGroundMap instance
    currentDataSet; // a instance of DataSet obj
    currentDataPoint; // a instance of DataPoint obj

    /**
     * this is the constructor of model
     * @param {Model} model - a instance of model
     */
    constructor(model) {
        this.model = model;
        this.backgroundMap = undefined;
        this.currentDataSet = undefined;
        this.currentDataPoint = undefined;
    }

    /**
     * This callback type is called `setUpBackGroundMapCallback`
     * It should receive a topojson data and show it to the screen.
     *
     * @callback setUpBackGroundMapCallback
     * @param {JSON} data
     */

    /**
     * This function sets up the back ground map. I should be only called once.
     * @see Model#getBackGroundMapObj
     *
     * @param {setUpBackGroundMapCallback} callBack
     */
    setUpBackGroundMap(callBack) {
        if (this.backgroundMap !== undefined) {
            return; // todo maybe generate an error.
        }
        this.backgroundMap = this.model.getBackGroundMapObj();
        this.backgroundMap.setUp(callBack);
    }

    /**
     * This callback type is called `setUpPointCallback`
     * It should receive a list of points
     *
     * @callback setUpPointCallback
     * @param {JSON} data
     */

    /**
     * This function sets up the data points (circles) in the map
     * @see Model#getDataSetObj
     * @see Model#getDataPointObj
     * @see DataSet#setUpPoints
     *
     * @param {setUpPointCallback} callBack
     */
    setUpPoints(callBack) {
        this.currentDataSet = this.model.getDataSetObj();
        this.currentDataPoint = this.model.getDataPointObj();
        this.currentDataSet.setUpPoints(callBack);
    }

    /**
     * This function sets up/changes the current data set
     * @see Model#setCurrentDataSet
     *
     * @param {String} dataSetsName
     */
    setCurrentDataSet(dataSetsName) {
        this.model.setCurrentDataSet(dataSetsName);
    }

    /**
     * This function sets up/changes the current data contaminant
     *
     * @param {String} contaminant
     */
    setCurrentContaminant(contaminant) {
        this.model.setCurrentContaminant(contaminant);
    }


    /**
     * This function returns the current contaminant.
     * @returns {String}
     */
    getCurrentContaminant() {
        return this.model.getCurrentContaminant();
    }

    /**
     * This function calculates the size of given data point which is actually the number of points in the area
     * @see DataSet#calculateSize
     *
     * @param {JSON} value
     * @returns {Number} size of the circle. A.k.a the number of points in the area.
     */
    calculateSize(value) {
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined) {
            // todo throw error
        }
        return this.currentDataSet.calculateSize(this.model.getCurrentContaminant(), value);
    }

    /**
     * This function calculates the color of given data point.
     * @see DataSet#calculateColor
     *
     * @param {JSON} value
     * @returns {String} a string of color that could be the name of the color or RGB in hex
     */
    calculateColor(value) {
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined) {
            // todo throw error
        }
        return this.currentDataSet.calculateColor(this.model.getCurrentContaminant(), value);
    }

    /**
     * This function returns a list of numbers for making legend points
     * @see DataSet#getLegendPoints
     *
     * @returns {Number[]} a series of numbers
     */
    getLegendPoints() {//size legend
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined) {
            // todo throw error
        }
        return this.currentDataSet.getLegendPoints(this.model.getCurrentContaminant());
    }

    /**
     * This function check whether or not current DataSet contains the current contaminant
     * because different data sets contain different contaminants
     * @see DataSet#isContaminantAvailable
     *
     * @returns {Boolean} true, if the current data set contains the contaminant. Otherwise, false
     */
    isCurrentContaminantAvailableInCurrentDataSet() {
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined) {
            // todo throw error
        }
        return this.currentDataSet.isContaminantAvailable(this.model.getCurrentContaminant());
    }

    /**
     * This function returns the number of samples in the given data point.
     * @see DataSet#getNumberOfSamplePoint
     *
     * @param {JSON} value
     * @returns {Number} e number of samples in the given data point.
     */
    getNumberOfSamplePoint(value) {
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined) {
            // todo throw error
        }
        return this.currentDataSet.getNumberOfSamplePoint(this.model.getCurrentContaminant(), value)
    }

    /**
     * This function returns the all samples of the current contaminant in the given data point.
     * @see DataSet#getAllSampleData
     *
     * @param {JSON} value
     * @returns {Number[]}
     */
    getAllSampleData(value) {
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined) {
            // todo throw error
        }
        return this.currentDataSet.getAllSampleData(this.model.getCurrentContaminant(), value)
    }

    /**
     * This function returns the average of the current contaminant in the given data point
     * @see DataSet#getSampleAverage
     *
     * @param {JSON} value
     * @returns {Number} the average value
     */
    getSampleAverage(value) {
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined) {
            // todo throw error
        }
        return this.currentDataSet.getSampleAverage(this.model.getCurrentContaminant(), value)
    }

    /**
     * This function returns the median of the current contaminant in the given data point.
     * @see DataSet#getSampleMedian
     *
     * @param {JSON} value
     * @returns {Number} the median value
     */
    getSampleMedian(value) {
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined) {
            // todo throw error
        }
        return this.currentDataSet.getSampleMedian(this.model.getCurrentContaminant(), value)
    }

    /**
     * This function calculates the exceeding value.
     * @see DataSet#getSampleExceed
     *
     * @param value
     * @returns {Number}
     */
    getSampleExceed(value) {
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined) {
            // todo throw error
        }
        return this.currentDataSet.getSampleExceed(this.model.getCurrentContaminant(), value)
    }

    /**
     * This function returns the max value of the current contaminant in the given data point.
     * @see DataSet#getMaxValues
     *
     * @returns {Number}
     */
    getTheMaxValueOfCurrentContaminantInCurrentDataSet() {
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined) {
            // todo throw error
        }
        return this.currentDataSet.getMaxValues(this.model.getCurrentContaminant());
    }

    /**
     * This function returns the Ref value of current contaminant in the current Data set.
     * @See DataSet#getRefValue
     *
     * @returns {Number} - the ref value
     */
    getTheRefValueOfCurrentContaminantInCurrentDataSet() {
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined) {
            // todo throw error
        }
        return this.currentDataSet.getRefValue(this.model.getCurrentContaminant());
    }

    /**
     * This function returns the unit for current data set
     * @see Model.units
     *
     * @returns {String} - s string of unit
     */
    getTheUnitForCurrentDataSet() {
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined) {
            // todo throw error
        }
        return Model.units[this.model.getCurrentDataSet()];
    }
}