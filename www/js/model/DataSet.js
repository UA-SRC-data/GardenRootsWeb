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
        return 1000000000
    }

    getColorScale(mineral) {
        if (this.availableMinerals.hasOwnProperty(mineral)) {
            let colorScale = d3.scaleLinear().domain([0, this.availableMinerals[mineral]]).range([Model.colors]);
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
            if (this.dataPoints.hasOwnProperty("default")) {
                this.dataPoints["default"] = new DataPoints(this.name, mineral, (value) => {
                        return "black"
                    },
                    d3.scaleLinear().domain([1, 5]).range([1, 5]))
            }
            return this.dataPoints["default"];
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
        }//todo throw error
        return this.dataPoints[mineral].calculateSize(value);
    }

    calculateColor(mineral, value) {
        if (!this.dataPoints.hasOwnProperty(mineral)) {
        }//todo throw error
        return this.dataPoints[mineral].calculateColor(value);
    }
}