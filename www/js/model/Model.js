class Model {
    //todo maybe should be read from json
    //to maybe take this into a object.
    static dataSets = {
        NULL: undefined,
        yard: "Soil Yard",
        garden: "Soil Garden",
        water: "water"
    };

    //todo maybe should be read from json
    static minerals = {
        NULL: undefined,
        Beryllium: "Beryllium",
        Sodium: "Sodium",
        Potassium: "Potassium",
        Calcium: "Calcium",
        Chromium: "Chromium",
        Manganese: "Manganese",
        Iron: "Iron",
        Cobalt: "Cobalt",
        Nickel: "Nickel",
        Copper: "Copper",
        Zinc: "Zinc",
        Arsenic: "Arsenic",
        Selenium: "Selenium",
        Molybdenum: "Molybdenum",
        Cadmium: "Cadmium",
        Barium: "Barium",
        Lead: "Lead"
    };

    static SRLS = {
        "Beryllium": 150,
        "Aluminum": 77000,
        "Vanadium": 78,
        "Chromium": 30,
        "Cobalt": 900,
        "Nickel": 1600,
        "Copper": 3100,
        "Zinc": 23000,
        "Arsenic": 10,
        "Selenium": 390,
        "Molybdenum": 390,
        "Silver": 390,
        "Cadmium": 39,
        "Tin": 47000,
        "Barium": 15000,
        "Lead": 400,
    };

    static MCLS = {
        "Beryllium": 4,
        "Chromium": 100,
        "Copper": 1300,
        "Arsenic": 10,
        "Selenium": 50,
        "Cadmium": 5,
        "Antimony": 6,
        "Barium": 2000,
        "Lead": 15
    };

    static allRefs = {
        "water": Model.MCLS,
        "yard": Model.SRLS,
        "garden": Model.SRLS
    };

    static colors = ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4'];
    static maxColor = '#0c2c84';

    static backGroundMapPath = "./lib/counties-and-roads.json";

    static libraryPath = "./lib/";

    static filenames = {
        "water": "water-centroids-avgs-vals.json",
        "yard": "yard-centroids-avgs-vals.json",
        "garden": "garden-centroids-avgs-vals.json"
    };


    // keep recording current data set and mineral
    currentDataSet;
    currentMineral;

    // other Model objects
    // a dictionary that maps minerals to their color scales
    dataSets = {};

    constructor() {
        this.currentDataSet = Model.dataSets.NULL;
        this.currentMineral = Model.minerals.NULL;
    }

    getCurrentDataSet() {
        return this.currentDataSet;
    }

    setCurrentDataSet(newSet) {
        if (newSet === this.currentDataSet) {
            return;
        }
        if (!Model.dataSets.hasOwnProperty(newSet)) {
            return;
        }
        this.currentDataSet = newSet;
        //todo clean other clean mineral
    }




    getCurrentMineral() {
        return this.currentMineral;
    }

    setCurrentMineral(newMineral) {
        if (newMineral === this.currentMineral) {
            return;
        }
        if (!Model.minerals.hasOwnProperty(newMineral)) {
            return;
        }
        this.currentMineral = newMineral;
        //todo clean other
    }

    getBackGroundMapObj(callback) {
        return new backgroundMap(Model.backGroundMapPath, callback);
    }

    getDataSetObj() {
        if (this.dataSets.hasOwnProperty(this.currentDataSet)) {
            return this.dataSets[this.currentDataSet];
        }
        let setObj = new DataSet(this.currentDataSet, Model.libraryPath + Model.filenames[this.currentDataSet]
            , Model.allRefs[this.currentDataSet]);
        this.dataSets[this.currentDataSet] = setObj;
        return setObj;
    }

    getDataPointObj(){
        let setObj = this.getDataSetObj();
        return setObj.getDataPointObj(this.currentMineral);
    }


}