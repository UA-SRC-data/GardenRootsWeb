class Model {
    //todo maybe should be read from json
    //to maybe take this into a object.
    static dataSets = {
        NULL: undefined,
        SOIL_YARD: "Soil Yard",
        SOIL_GARDEN: "Soil Garden",
        WATER: "water"
    };

    //todo maybe should be read from json
    static mineral = {
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

    static backGroundMapPath = "./lib/counties-and-roads.json";


    // keep recording current data set and mineral
    currentDataSet;
    currentMineral;

    // other Model objects
    // a dictionary that maps minerals to their color scales
    colorScales = {};
    backGroundMap = undefined;

    constructor() {
        this.currentDataSet = Model.dataSets.NULL;
        this.currentMineral = Model.mineral.NULL;
    }

    getBackGroundMapObj(callback){
        return new backgroundMap(Model.backGroundMapPath, callback);
    }

    changeDataSet(newSet) {
        //check if the give set is OK
        if(!Model.dataSets.contains(newSet)){
            return
        }
        //check if the current one
        if(newSet === this.currentDataSet){
            return;
        }
        //change currentDataSer
        this.currentDataSet = newSet;
        //change currentMineral to null
        this.currentMineral = Model.mineral.NULL;
        //todo reset the color scale to all white
        //todo clean mineral
        //todo delete data points
    }

    getColor(value){






    }
}