class DataSet {

    name;
    jsonData;
    availableMinerals;
    callBack;
    dataPoints = {};
    maxValues = {};

    constructor(setName, setPath, availableMinerals) {
        this.name = setName;
        this.availableMinerals = availableMinerals;
        d3.json(setPath, (err, data) => {
            if (err) {// todo err message
                console.log(err);
            }
            this.jsonData = data;
        })
    }

    #getMaxValues(mineral){
        //todo implement
        return 1000000000
    }

    #getColorScale(mineral){
        if (this.availableMinerals.hasOwnProperty(mineral)){
            let colorScale =  d3.scaleLinear().domain([0, this.availableMinerals[mineral]]).range([Model.colors]);
            return (value)=>{
                if (value> this.availableMinerals[mineral]){
                    return Model.maxColor;
                }else{
                    return colorScale(value);
                }
            };
        }
        return d3.scaleLinear().domain([0, this.#getMaxValues(mineral)]).range(["white", "purple"]);
    }

    getDataPointObj(mineral){
        if (!this.dataPoints.hasOwnProperty(mineral)){
            this.dataPoints[mineral] =
                new DataPoints(this.name, mineral, this.#getColorScale(mineral),
                    d3.scaleLinear().domain([1,5]).range([1,5])) //because we are just using the number of point.
        }
    }

    calculateSize(mineral, value){
        if(! this.dataPoints.hasOwnProperty(mineral)){}//todo throw error
        return this.dataPoints[mineral].calculateSize(value);
    }

    calculateColor(mineral, value){
        if(! this.dataPoints.hasOwnProperty(mineral)){}//todo throw error
        return this.dataPoints[mineral].calculateColor(value);
    }
}