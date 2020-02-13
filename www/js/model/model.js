class model {
    //todo maybe should be read from json
    //to maybe take this into a object.
    dataSets = {
        NULL: undefined,
        SOIL_YARD: "Soil Yard",
        SOIL_GARDEN: "Soil Garden",
        WATER: "water"
    };

    //todo maybe should be read from json
    mineral = {
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



    currentDataSet;
    currentMineral;

    constructor() {
        this.currentDataSet = this.dataSets.NULL;
        this.currentMineral = this.mineral.NULL;
        //todo construct others
    }

    changeDataSet(newSet) {
        //todo check if the current one
        //todo change currentDataSer
        //todo change currentMineral to null
        //todo reset the color scale
    }
}