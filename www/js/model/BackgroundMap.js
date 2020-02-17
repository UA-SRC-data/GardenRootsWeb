class backgroundMap{

    path;
    callback;

    constructor(path, callback) {
        this.path = path;
        this.callback = callback;
    }

    setUp(){
        this.callback(this.path);
    }
}