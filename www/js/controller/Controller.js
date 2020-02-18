class Controller{

    view;
    model;
    backgroundMap = undefined;

    constructor(view, model){
        this.model = model;
        this.view = view;
    }

    setUPBackGroundMap(callBack){
        if (this.backgroundMap !== undefined){
            return; // todo maybe generate an error.
        }
        this.backgroundMap = this.model.getBackGroundMapObj(callBack);
        this.backgroundMap.setUp();
    }

    setCurrentDataSet(dataSetsName){
        this.model.setCurrentDataSet(dataSetsName);
    }

    setCurrentMineral(mineralName){
        this.model.setCurrentMineral(mineralName);
    }
}