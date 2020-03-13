/**
 * This class stores the geo json of arizona map
 */
class BackGroundMap{

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
     * @param {setUpBackGroundMapCallback} callback
     */
    setUp(callback){
        if (this.jsonData === undefined) {
            d3.json(this.path).then((data) => {
                this.jsonData = data;
                callback(data.features);
            })
        } else {
            callback(this.jsonData.features);
        }
    }
}