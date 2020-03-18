/**
 * This class manages other classes under model directory
 */
class Model {
    //todo maybe should be read from json
    //todo maybe take this into a object.
    /** @type {{yard: string, NULL: undefined, garden: string, water: string}}*/
    static dataSets = {
        NULL: undefined,
        yard: "Soil Yard",
        garden: "Soil Garden",
        water: "water"
    };

    //todo maybe should be read from json
    /**
     * @type {{Cadmium: string, Barium: string, NULL: undefined, Calcium: string,
     * Arsenic: string, Iron: string, Cobalt: string, Molybdenum: string, Zinc: string,
     * Sodium: string, Beryllium: string, Chromium: string, Lead: string, Nickel: string,
     * Selenium: string, Copper: string, Potassium: string, Manganese: string}}*
     */
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

    /**
     * @type {{Cadmium: number, Barium: number, Arsenic: number, Aluminum: number,
     * Vanadium: number, Cobalt: number, Molybdenum: number, Zinc: number, Silver: number,
     * Beryllium: number, Chromium: number, Tin: number, Lead: number, Nickel: number,
     * Selenium: number, Copper: number}}
     */
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

    /**
     * @type {{Cadmium: number, Barium: number, Arsenic: number,
     * Beryllium: number, Chromium: number, Lead: number, Antimony: number,
     * Selenium: number, Copper: number}}
     */
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

    /**
     * @type {{yard: {Cadmium: number, Barium: number, Arsenic: number,
     * Aluminum: number, Vanadium: number, Cobalt: number,
     * Molybdenum: number, Zinc: number, Silver: number,
     * Beryllium: number, Chromium: number, Tin: number,
     * Lead: number, Nickel: number, Selenium: number,
     * Copper: number},
     * garden: {Cadmium: number, Barium: number,
     * Arsenic: number, Aluminum: number, Vanadium: number,
     * Cobalt: number, Molybdenum: number, Zinc: number,
     * Silver: number, Beryllium: number, Chromium: number,
     * Tin: number, Lead: number, Nickel: number, Selenium: number,
     * Copper: number},
     * water: {Cadmium: number, Barium: number, Arsenic: number,
     * Beryllium: number, Chromium: number, Lead: number, Antimony: number,
     * Selenium: number, Copper: number}}}
     */
    static allRefs = {
        "water": Model.MCLS,
        "yard": Model.SRLS,
        "garden": Model.SRLS
    };

    /**
     * @type {{Cadmium: number, Barium: number, Calcium: number, Arsenic: number,
     * Vanadium: number, Antimony: number, Aluminium: number, Iron: number,
     * Cobalt: number, Molybdenum: number, Zinc: number, Silver: number,
     * Sodium: number, Beryllium: number, Chromium: number, Tin: number,
     * Lead: number, Nickel: number, Magnesium: number, Selenium: number,
     * Copper: number, Potassium: number, Manganese: number}}
     */
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

    static availableCounties = {
        all: undefined,
        Apache: "Apache",
        GreenLee: "GreenLee",
        Cochise: "Cochise",
        Yavapai: "Yavapai"
    };

    /** @type {string[]} */
    static colors = ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4'];
    /** @type {string} */
    static maxColor = '#0c2c84';
    /** @type {string[]} */
    static defaultColor = ["white", "purple"];

    /** @type {{yard: string, garden: string, water: string}} */
    static units = {
        "water": "ug/L",
        "yard": "ug/mg",
        "garden": "ug/mg"
    };

    /** @type {string} */
    static backGroundMapPath = "./lib/counties-and-roads.json";

    /** @type {string} */
    static libraryPath = "./lib/";

    /** type {{yard: string, garden: string, water: string}} */
    static filenames = {
        "water": "water-centroids-avgs-vals.json",
        "yard": "yard-centroids-avgs-vals.json",
        "garden": "garden-centroids-avgs-vals.json"
    };


    // keep recording current data set and contaminant
    /** @member {string} */
    currentDataSet;
    /** @member {string} */
    currentContaminant;
    /** @member {string} */
    currentCounty;

    /** @member {{string:DataSet}} dataSets - a dictionary that maps contaminant to their color scales*/
    dataSets = {};

    /**
     * This is constructor
     */
    constructor() {
        this.currentDataSet = Model.dataSets.NULL;
        this.currentContaminant = Model.contaminants.NULL;
        this.currentCounty = Model.availableCounties.all;
    }

    /**
     * return the current data set selected by user
     * @return {string}
     */
    getCurrentDataSet() {
        return this.currentDataSet;
    }

    /**
     * set the current data set
     * @param {string} newSet
     */
    setCurrentDataSet(newSet) {
        if (newSet === this.currentDataSet) {
            return;
        }
        if (!Model.dataSets.hasOwnProperty(newSet)) {
            return;
        }
        this.currentDataSet = newSet;
    }

    /**
     * set the current county
     * @param {string} county
     */
    setCurrentCounty(county) {
        if (county === this.currentDataSet) {
            return;
        }
        if (!Model.availableCounties.hasOwnProperty(county)) {
            return;
        }
        this.currentCounty = county;
    }

    /**
     * This function returns the current county selected by user
     * @return {string}
     */
    getCurrentCounty() {
        return this.currentCounty;
    }


    /**
     * This function returns the current contaminant selected by user
     * @return {string}
     */
    getCurrentContaminant() {
        return this.currentContaminant;
    }

    /**
     * set the current contaminant
     * @param {string} newContaminant
     */
    setCurrentContaminant(newContaminant) {
        if (newContaminant === this.currentContaminant) {
            return;
        }
        if (!Model.contaminants.hasOwnProperty(newContaminant)) {
            return;
        }
        this.currentContaminant = newContaminant;
    }

    /**
     * This function initializes a instance of background map
     * @return {BackGroundMap}
     */
    getBackGroundMapObj() {
        return new BackGroundMap(Model.backGroundMapPath);
    }

    /**
     * This function returns a dataset instance.
     * If the data set has been initialized, initializes a new one.
     * Otherwise, returns the old one.
     * @return {DataSet}
     */
    getDataSetObj() {
        if (this.dataSets.hasOwnProperty(this.currentDataSet)) {
            return this.dataSets[this.currentDataSet];
        }
        let setObj = new DataSet(this.currentDataSet, Model.libraryPath + Model.filenames[this.currentDataSet]
            , Model.allRefs[this.currentDataSet]);
        this.dataSets[this.currentDataSet] = setObj;
        return setObj;
    }
}