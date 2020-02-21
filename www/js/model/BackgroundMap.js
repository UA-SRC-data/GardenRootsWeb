class backgroundMap{

    path;
    jsonData;

    constructor(path) {
        this.path = path;
    }

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