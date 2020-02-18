class DataSet {

    name;
    jsonData;
    callBack;

    constructor(setName, setPath, callBack) {
        this.name = setName;
        this.callBack = callBack;
        d3.json(setPath, (err, data) => {
            if (err) {// todo err message
                console.log(err);
            }
            this.jsonData = data;
        })
    }

    setUp() {
        this.callBack(this.jsonData)
    }


}