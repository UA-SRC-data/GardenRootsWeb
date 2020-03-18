/**
 * This class stores the geo json of arizona map
 */
class BackGroundMap {

    /** @member {string} */
    path;
    /** @member {JSON} */
    jsonData;

    /**
     * This is the constructor
     * @param path
     */
    constructor(path) {
        this.path = path;
    }

    /**
     * Call this function to get the geojson data
     * @param {string} county
     * @param {setUpBackGroundMapCallback} callback
     */
    setUp = (county, callback) => {
        if (this.jsonData === undefined) {
            d3.json(this.path).then((data) => {
                this.jsonData = data;
                this.setUp(county, callback);
            });
            return;
        }
        if (county !== Model.availableCounties.all) {
            callback(this.jsonData.features.filter(f => f.properties.hasOwnProperty("NAME10") && f.properties.NAME10 === county));
        } else {
            callback(this.jsonData.features);
        }

    }
}