/**
 * This callback type is called `getDataCallback`
 * It is supposed to visualize the data on map
 *
 * @callback getDataCallback
 * @param {dataPointWithAssociatedInfo} data
 */










class DataSet {

    name;
    dataPath;
    refValues;
    /**@type {(?|DataPoint)[]}  */
    dataPoints = [];
    LegendSample = [20, 10, 5, 2, 1];

    colorScales;
    sizeScales;

    constructor(setName, setPath, refValues) {
        this.name = setName;
        this.refValues = refValues;
        this.dataPath = setPath;
        this.colorScales = new ColorScales(refValues);
        this.sizeScales = new SizeScales();
    }

    setUpPoints(contaminant, callback) {
        if (this.dataPoints.length === 0) {
            d3.json(this.dataPath).then((data) => {
                for (let i=0; i<data; i++){// todo color scale
                    this.dataPoints.push(new DataPoint(data[i], this.colorScales, this.sizeScales))
                }
                callback(this.dataPoints.map(point=>point.getData(contaminant)).filter(x=>x !== null));
            })
        } else {
            callback(this.dataPoints.map(point=>point.getData(contaminant)).filter(x=>x !== null));
        }
    }

    getRefValue(contaminant){
        return this.refValues[contaminant];
    }

    getMaxValues(contaminant) {
        return Model.maxes[contaminant];
    }

    calculateSize(contaminant, value) {
        this.sizeScales.calculateSize(contaminant, value);
    }

    calculateColor(contaminant, value) {
        this.colorScales.calculateColor(contaminant, value);
    }

    isContaminantAvailable(contaminant){
        return this.refValues.hasOwnProperty(contaminant);
    }

    getLegendPoints(contaminant){
        let data=[];
        for (let i=0; i<this.LegendSample.length; i++){
            data.push({
                sample: this.LegendSample[i],
                r:this.sizeScales.calculateSize(contaminant, this.LegendSample[i])
            })
        }
        return data;
    }
}