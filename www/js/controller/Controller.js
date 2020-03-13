/**
 * This class is the controller for this data visualization.
 * All data accesses by view need to be done by calling functions in controller instead of directly call to model.
 */
class Controller {

    /** @member {Model} model  a model instance is passed through constructor */
    model;
    /** @member {BackGroundMap} BackGroundMap - a BackGroundMap instance */
    backgroundMap;
    /** @member {DataSet} currentDataSet - a instance of DataSet obj */
    currentDataSet;

    /**
     * this is the constructor of model
     * @param {Model} model - a instance of model
     */
    constructor(model) {
        this.model = model;
        this.backgroundMap = undefined;
        this.currentDataSet = undefined;
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
     * @param {dataPointWithAssociatedInfo[]} data
     */

    /**
     * This function sets up the data points (circles) in the map
     * @see Model#getDataSetObj
     * @see DataSet#setUpPoints
     *
     * @param {setUpPointCallback} callBack
     * @param {function} [filter]
     */
    setUpPoints(callBack,filter) {
        this.currentDataSet = this.model.getDataSetObj();
        this.currentDataSet.setUpPoints(this.model.getCurrentContaminant(), callBack, filter);
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
     * This function checks whether currentDataSet has already been set.
     *
     * @returns {boolean}
     */
    isCurrentDataSetNull() {
        return this.model.getCurrentDataSet() === Model.dataSets.NULL;
    }

    /**
     * This function calculates the size of given data point which is actually the number of points in the area
     * @see DataSet#calculateSize
     *
     * @param {number} value
     * @returns {number} size of the circle. A.k.a the number of points in the area.
     */
    calculateSize(value) {
        if (this.currentDataSet === undefined) {
            // todo throw error
        }
        return this.currentDataSet.calculateSize(this.model.getCurrentContaminant(), value);
    }

    /**
     * This function calculates the color of given data point.
     * @see DataSet#calculateColor
     *
     * @param {number} value
     * @returns {string} a string of color that could be the name of the color or RGB in hex
     */
    calculateColor(value) {
        if (this.currentDataSet === undefined) {
            // todo throw error
        }
        return this.currentDataSet.calculateColor(this.model.getCurrentContaminant(), value);
    }

    /**
     * This function returns a list of numbers for making legend points
     * @see DataSet#getLegendPoints
     *
     * @returns {Object.<string, number>[]} a series of numbers
     */
    getLegendPoints() {//size legend
        if (this.currentDataSet === undefined) {
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
        if (this.currentDataSet === undefined) {
            // todo throw error
        }
        return this.currentDataSet.isContaminantAvailable(this.model.getCurrentContaminant());
    }

    /**
     * This function returns the max value of the current contaminant in the given data point.
     * @see DataSet#getMaxValues
     *
     * @returns {Number}
     */
    getTheMaxValueOfCurrentContaminantInCurrentDataSet() {
        if (this.currentDataSet === undefined) {
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
        if (this.currentDataSet === undefined) {
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
        if (this.currentDataSet === undefined) {
            // todo throw error
        }
        return Model.units[this.model.getCurrentDataSet()];
    }
}