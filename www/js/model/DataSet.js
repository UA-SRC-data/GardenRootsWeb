class DataSet {

    name;
    jsonData;
    dataPath;
    availableContaminants;
    dataPoints = {};

    constructor(setName, setPath, availableContaminants) {
        this.name = setName;
        this.availableContaminants = availableContaminants;
        this.dataPath = setPath;

    }

    setUpPoints(callback) {
        if (this.jsonData === undefined) {
            d3.json(this.dataPath).then((data) => {
                this.jsonData = data;
                callback(data);
            })
        } else {
            callback(this.jsonData);
        }
    }

    getMaxValues(contaminant) {
        return Model.maxes[contaminant];
    }

    getColorScale(contaminant) {
        if (this.availableContaminants.hasOwnProperty(contaminant)) {
            let colorScale = d3.scaleLinear().domain([0, this.availableContaminants[contaminant]]).range(Model.colors);
            return (value) => {
                if (value > this.availableContaminants[contaminant]) {
                    return Model.maxColor;
                } else {
                    return colorScale(value);
                }
            };
        }
        return d3.scaleLinear().domain([0, this.getMaxValues(contaminant)]).range(["white", "purple"]);
    }

    getDataPointObj(contaminant) {
        if (!this.dataPoints.hasOwnProperty(contaminant)) {
            this.dataPoints[contaminant] =
                new DataPoints(this.name, contaminant, this.getColorScale(contaminant),
                    d3.scaleLinear().domain([1, 5]).range([1, 5])) //because we are just using the number of point.
        }
        return this.dataPoints[contaminant];
    }

    calculateSize(contaminant, value) {
        if (!this.dataPoints.hasOwnProperty(contaminant)) {
            // todo throw error
        }
        return this.dataPoints[contaminant].calculateSize(value);
    }

    calculateColor(contaminant, value) {
        if (!this.dataPoints.hasOwnProperty(contaminant)) {
            // todo throw error
        }
        return this.dataPoints[contaminant].calculateColor(value);
    }

    getLegendPoints(contaminant) {
        if (!this.dataPoints.hasOwnProperty(contaminant)) {
            // todo throw error
        }
        return this.dataPoints[contaminant].getLegendPoints();
    }

    getNumberOfSamplePoint(contaminant, value) {
        if (!this.dataPoints.hasOwnProperty(contaminant)) {
            // todo throw error
        }
        return this.dataPoints[contaminant].getNumberOfSamplePoint(value);
    }

    getAllSampleData(contaminant, value){
        if (!this.dataPoints.hasOwnProperty(contaminant)) {
            // todo throw error
        }
        return this.dataPoints[contaminant].getAllSampleData(value);
    }

    getSampleAverage(contaminant, value){
        if (!this.dataPoints.hasOwnProperty(contaminant)) {
            // todo throw error
        }
        return this.dataPoints[contaminant].getSampleAverage(value);
    }

    getSampleMedian(contaminant, value){
        if (!this.dataPoints.hasOwnProperty(contaminant)) {
            // todo throw error
        }
        return this.dataPoints[contaminant].getSampleMedian(value);
    }

    getSampleExceed(contaminant, value){
        if (!this.dataPoints.hasOwnProperty(contaminant)) {
            // todo throw error
        }
        return this.dataPoints[contaminant].getSampleExceed(value);
    }

    isContaminantAvailable(contaminant){
        return this.availableContaminants.hasOwnProperty(contaminant);
    }
}