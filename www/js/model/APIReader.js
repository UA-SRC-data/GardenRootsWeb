class APIReader {
    static testUrl = "https://src.cals.arizona.edu/api/v1/";
    static CSMMeasurementUrl = "https://src.cals.arizona.edu/api/v1/data/csm/measurements";
    static CSMStationUrl = "https://src.cals.arizona.edu/api/v1/data/csm/stations";
    static ListCSMUrl = "https://src.cals.arizona.edu/api/v1/data/csm";
    static ScrutinizerVariableUrl = "https://src.cals.arizona.edu/api/v1/scrutinizer/variables";
    static ScrutinizerMeasurementUrl = "https://src.cals.arizona.edu/api/v1/scrutinizer/measurements";


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

    static get = (url, callback) => {
        if (callback !== undefined) {
            d3.json(url).then(callback)
        } else {
            return (callback) => {
                d3.json(url).then(callback)
            }
        }
    };


    static test = (callback) => {
        APIReader.get(APIReader.testUrl, function (d) {
            if (d === undefined || d.Hello === undefined || d.Hello !== "World") {
                alert("API is not running.")
            } else {
                callback()
            }
        })
    };


    static getCSMMeasurements = APIReader.get(APIReader.CSMMeasurementUrl);

    static getCSMStations = APIReader.get(APIReader.CSMStationUrl);

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

    static getScrutinizerVariables = APIReader.get(APIReader.ScrutinizerVariableUrl);

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