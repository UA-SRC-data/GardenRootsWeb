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

    setCurrentContaminant(contaminant){
        this.model.setCurrentContaminant(contaminant);
    }

    getCurrentContaminant(){
        this.model.getCurrentContaminant();
    }

    calculateSize(value){
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined){
            // todo throw error
        }
        return this.currentDataSet.calculateSize(this.model.getCurrentContaminant(), value);
    }

    calculateColor(value){
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined){
            // todo throw error
        }
        return this.currentDataSet.calculateColor(this.model.getCurrentContaminant(), value);
    }

    getLegendPoints() {//size legend
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined){
            // todo throw error
        }
        return this.currentDataSet.getLegendPoints(this.model.getCurrentContaminant());
    }

    isCurrentContaminantAvailableInCurrentDataSet(){
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined){
            // todo throw error
        }
        return this.currentDataSet.isContaminantAvailable(this.model.currentContaminant);
    }

    getNumberOfSamplePoint(value){
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined){
            // todo throw error
        }
        return this.currentDataSet.getNumberOfSamplePoint(this.model.currentContaminant, value)
    }

    getAllSampleData(value){
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined){
            // todo throw error
        }
        return this.currentDataSet.getAllSampleData(this.model.currentContaminant, value)
    }

    getSampleAverage(value){
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined){
            // todo throw error
        }
        return this.currentDataSet.getSampleAverage(this.model.currentContaminant, value)
    }

    getSampleMedian(value){
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined){
            // todo throw error
        }
        return this.currentDataSet.getSampleMedian(this.model.currentContaminant, value)
    }

    getSampleExceed(value){
        if (this.currentDataSet === undefined || this.currentDataPoint === undefined){
            // todo throw error
        }
        return this.currentDataSet.getSampleExceed(this.model.currentContaminant, value)
    }
}