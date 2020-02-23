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
    static contaminants = {
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

    static maxes = {
        "Beryllium": 2.0385893966666666,
        "Sodium": 2320.69,
        "Magnesium": 19595.42,
        "Aluminium": 14621,
        "Potassium": 5234,
        "Calcium": 168491.945,
        "Vanadium": 42.620000000000005,
        "Chromium": 55.769999999999996,
        "Manganese": 2087.1447099,
        "Iron": 38754.35317433332,
        "Cobalt": 16.205913156200005,
        "Nickel": 35.004999999999995,
        "Copper": 649.255,
        "Zinc": 816.5,
        "Arsenic": 74.75503407046666,
        "Selenium": 9.64,
        "Molybdenum": 3.0700000000000003,
        "Silver": 0.8240000000000001,
        "Cadmium": 4.475,
        "Tin": 55.410000000000004,
        "Antimony": 0.33599999999999997,
        "Barium": 988.4449999999999,
        "Lead": 498.85
    };

    static colors = ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4'];
    static maxColor = '#0c2c84';

    static units = {
        "water": "ug/L",
        "yard": "ug/mg",
        "garden": "ug/mg"
    };

    static backGroundMapPath = "./lib/counties-and-roads.json";

    static libraryPath = "./lib/";

    static filenames = {
        "water": "water-centroids-avgs-vals.json",
        "yard": "yard-centroids-avgs-vals.json",
        "garden": "garden-centroids-avgs-vals.json"
    };


    // keep recording current data set and contaminant
    currentDataSet;
    currentContaminant;

    // other Model objects
    // a dictionary that maps contaminant to their color scales
    dataSets = {};

    constructor() {
        this.currentDataSet = Model.dataSets.NULL;
        this.currentContaminant = Model.contaminants.NULL;
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
        //todo clean other clean contaminant
    }


    getCurrentContaminant() {
        return this.currentContaminant;
    }

    setCurrentContaminant(newContaminant) {
        if (newContaminant === this.currentContaminant) {
            return;
        }
        if (!Model.contaminants.hasOwnProperty(newContaminant)) {
            return;
        }
        this.currentContaminant = newContaminant;
    }

    getBackGroundMapObj() {
        return new backgroundMap(Model.backGroundMapPath);
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

    isCurrentDataSetReady() {
        return this.dataSets.hasOwnProperty(this.currentDataSet);
    }

    getDataPointObj() {
        let setObj = this.getDataSetObj();
        return setObj.getDataPointObj(this.currentContaminant);
    }

    isCurrentDataPointReady() {
        return this.isCurrentDataSetReady() && this.dataSets[this.currentDataSet].dataPoints.hasOwnProperty(this.currentContaminant);
    }

}