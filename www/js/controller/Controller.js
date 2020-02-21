class Controller{

    view;
    model;
    backgroundMap = undefined;
    currentDataSet;
    currentDataPoint;

    constructor(view, model){
        this.model = model;
        this.view = view;
        this.currentDataSet = undefined;
        this.currentDataPoint = undefined;
    }

    setUpBackGroundMap(callBack){
        if (this.backgroundMap !== undefined){
            return; // todo maybe generate an error.
        }
        this.backgroundMap = this.model.getBackGroundMapObj(callBack);
        this.backgroundMap.setUp();
    }

    setUpPoints(callBack){
        this.currentDataSet = this.model.getDataSetObj();
        this.currentDataPoint = this.model.getDataPointObj();
        this.currentDataSet.setUpPoints(callBack);
    }

    setCurrentDataSet(dataSetsName){
        this.model.setCurrentDataSet(dataSetsName);
    }

    setCurrentMineral(mineralName){
        this.model.setCurrentMineral(mineralName);
    }

    calculateSize(value){
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined){
            // todo throw error
        }
        return this.currentDataSet.calculateSize(this.model.getCurrentMineral(), value);
    }


    calculateColor(value){
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined){
            // todo throw error
        }
        let contaminant = this.model.getCurrentMineral();
        return this.currentDataSet.calculateColor(contaminant, value);//todo put it to better place
    }



}