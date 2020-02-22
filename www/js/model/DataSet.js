class DataSet {

    name;
    jsonData;
    dataPath;
    availableMinerals;
    dataPoints = {};
    maxValues = {};

    constructor(setName, setPath, availableMinerals) {
        this.name = setName;
        this.availableMinerals = availableMinerals;
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

    getMaxValues(mineral) {
        //todo implement
        return 2320
    }

    getColorScale(mineral) {
        if (this.availableMinerals.hasOwnProperty(mineral)) {
            let colorScale = d3.scaleLinear().domain([0, this.availableMinerals[mineral]]).range(Model.colors);
            return (value) => {
                if (value > this.availableMinerals[mineral]) {
                    return Model.maxColor;
                } else {
                    return colorScale(value);
                }
            };
        }
        return d3.scaleLinear().domain([0, this.getMaxValues(mineral)]).range(["white", "purple"]);
    }

    getDataPointObj(mineral) {
        if (!this.availableMinerals.hasOwnProperty(mineral)) {
            this.dataPoints[mineral] = new DataPoints(this.name, mineral, this.getColorScale(mineral),
                d3.scaleLinear().domain([1, 5]).range([1, 5]));
            return this.dataPoints[mineral];
        }
        if (!this.dataPoints.hasOwnProperty(mineral)) {
            this.dataPoints[mineral] =
                new DataPoints(this.name, mineral, this.getColorScale(mineral),
                    d3.scaleLinear().domain([1, 5]).range([1, 5])) //because we are just using the number of point.
        }
        return this.dataPoints[mineral];
    }

    calculateSize(mineral, value) {
        if (!this.dataPoints.hasOwnProperty(mineral)) {
            // todo throw error
        }
        return this.dataPoints[mineral].calculateSize(value);
    }

    calculateColor(mineral, value) {
        if (!this.dataPoints.hasOwnProperty(mineral)) {
            // todo throw error
        }
        return this.dataPoints[mineral].calculateColor(value);
    }

    getLegendPoints(mineral) {
        if (!this.dataPoints.hasOwnProperty(mineral)) {
            // todo throw error
        }
        return this.dataPoints[mineral].getLegendPoints();
    }

    getNumberOfSamplePoint(mineral, value) {
        if (!this.dataPoints.hasOwnProperty(mineral)) {
            // todo throw error
        }
        return this.dataPoints[mineral].getNumberOfSamplePoint(value);
    }

    getAllSampleData(mineral, value){// todo we may call it sample
        if (!this.dataPoints.hasOwnProperty(mineral)) {
            // todo throw error
        }
        return this.dataPoints[mineral].getAllSampleData(value);
    }

    getSampleAverage(mineral, value){// todo we may call it sample
        if (!this.dataPoints.hasOwnProperty(mineral)) {
            // todo throw error
        }
        return this.dataPoints[mineral].getSampleAverage(value);
    }

    getSampleMedian(mineral, value){// todo we may call it sample
        if (!this.dataPoints.hasOwnProperty(mineral)) {
            // todo throw error
        }
        return this.dataPoints[mineral].getSampleMedian(value);
    }

    isMineralAvailable(mineral){
        return this.availableMinerals.hasOwnProperty(mineral);
    }
}