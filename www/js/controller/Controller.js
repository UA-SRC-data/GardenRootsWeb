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
        this.backgroundMap = this.model.getBackGroundMapObj();
        this.backgroundMap.setUp(callBack);
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
        return this.currentDataSet.calculateColor(this.model.getCurrentMineral(), value);
    }

    getLegendPoints() {//size legend
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined){
            // todo throw error
        }
        return this.currentDataSet.getLegendPoints(this.model.getCurrentMineral());
    }

    isCurrentMineralAvailableInCurrentDataSet(){
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined){
            // todo throw error
        }
        return this.currentDataSet.isMineralAvailable(this.model.currentMineral);
    }

    getNumberOfSamplePoint(value){
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined){
            // todo throw error
        }
        return this.currentDataSet.getNumberOfSamplePoint(this.model.currentMineral, value)
    }

}