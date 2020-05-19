/**
 * This class is designed to get data from the API. All methods are static since there is no reason to have multiple
 * instances.
 */
class APIReader {
    /** @type {string} */
    static testUrl = "https://src.cals.arizona.edu/api/v1/";
    /** @type {string} */
    static CSMMeasurementUrl = "https://src.cals.arizona.edu/api/v1/data/csm/measurements";
    /** @type {string} */
    static CSMStationUrl = "https://src.cals.arizona.edu/api/v1/data/csm/stations";
    /** @type {string} */
    static ListCSMUrl = "https://src.cals.arizona.edu/api/v1/data/csm";
    /** @type {string} */
    static ScrutinizerVariableUrl = "https://src.cals.arizona.edu/api/v1/scrutinizer/variables";
    /** @type {string} */
    static ScrutinizerMeasurementUrl = "https://src.cals.arizona.edu/api/v1/scrutinizer/measurements";


    /**
     * This function will construct a query url.
     * @param {string} url
     * @param {{string: string}}args
     * @return {string}
     */
    static constructQuery = (url, args) => {
        if (Object.keys(args).length === 0) {
            return url
        }
        let s = "?";
        for (let key in args) {
            if (args.hasOwnProperty(key) && args[key] !== undefined) {
                s += `${key}=${args[key]}&`
            }
        }
        return url + s.substring(0, s.length - 1)
    };

    /**
     * This function get data from given url. If a callback function is not given, it will return a function that takes
     * a function as a parameter.
     * @param {string} url
     * @param {function} [callback]
     * @return {function(...[*]=)} if callback is not given.
     */
    static get = (url, callback) => {
        if (callback !== undefined) {
            d3.json(url).then(callback)
        } else {
            return (callback) => {
                d3.json(url).then(callback)
            }
        }
    };


    /**
     * This method tests if the API is working.
     * @param callback
     */
    static test = (callback) => {
        APIReader.get(APIReader.testUrl, function (d) {
            if (d === undefined || d.Hello === undefined || d.Hello !== "World") {
                alert("API is not running.")
            } else {
                callback()
            }
        })
    };


    /**
     * This is a function. call it with a callback function
     */
    static getCSMMeasurements = APIReader.get(APIReader.CSMMeasurementUrl);

    /**
     * This is a function. call it with a callback function
     */
    static getCSMStations = APIReader.get(APIReader.CSMStationUrl);

    /**
     * see the api web page for detailed explanation of parameters
     * @param {string} measurement
     * @param {string} station
     * @param {string} start_date
     * @param {string} end_date
     * @param {string} val_max
     * @param {string} val_min
     * @param {function} callback
     * @return {function(...[*]=)}
     */
    static getListCSM = (measurement, station, start_date, end_date, val_max, val_min, callback) => {
        let url = APIReader.constructQuery(APIReader.ListCSMUrl, {
            "measurement": measurement,
            "station": station,
            "start_date": start_date,
            "end_date": end_date,
            "val_max": val_max,
            "val_min": val_min
        });
        return APIReader.get(url, callback)
    };

    /**
     * This is a function. call it with a callback function
     */
    static getScrutinizerVariables = APIReader.get(APIReader.ScrutinizerVariableUrl);

    /**
     * see the api web page for detailed explanation of parameters
     * @param {string} variable
     * @param {string} location_name
     * @param {string} location_type
     * @param {string} max_value
     * @param {string} min_value
     * @param {string} start_date
     * @param {string} end_date
     * @param {function} callback
     * @return {function(...[*]=)}
     */
    static getScrutinizerMeasurements = (variable, location_name, location_type, max_value, min_value, start_date, end_date, callback) => {
        let url = APIReader.constructQuery(APIReader.ScrutinizerMeasurementUrl, {
            "variable": variable,
            "location_name": location_name,
            "location_type": location_type,
            "max_value": max_value,
            "min_value": min_value,
            "start_date": start_date,
            "end_date": end_date
        });
        return APIReader.get(url, callback)
    }

}