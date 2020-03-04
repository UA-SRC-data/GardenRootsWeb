//todo color scale restructure
//todo callback for cleaning

//todo what is ref????
class View {

    static projection = d3.geoAlbersUsa().scale(4500).translate([1750, 100]);
    static geoPath = d3.geoPath().projection(View.projection);
    static zoom = d3.zoom();

    static svgWidth = "100%";
    static svgHeight = "100vh";
    static divClass = ".mapCanvas";
    static setSelectorId = "dataset";
    static contaminantSelectorId = "contaminant";

    static histogramSvgHeight = 600;
    static viewInstance = undefined;

    controller;
    model;
    mainSvg;
    histogramSvg;
    point;
    backgroundMap;
    sizeLegend;
    colorLegend;
    histogram;

    constructor() {
        this.model = new Model();
        this.controller = new Controller(this, this.model);
        this.setUpSvg();
        this.backgroundMap = new BackgroundMap(this.mainSvg, this.controller);
        this.point = new Points(this.mainSvg, this.controller);
        this.sizeLegend = new SizeLegend(this.mainSvg, this.controller);
        this.colorLegend = new ColorLegend(this.mainSvg, this.controller);
        this.histogram = new Histogram(this.histogramSvg, this.controller);
    }

    setUpSvg() {
        this.mainSvg = d3.select(View.divClass)
            .append("svg")
            .attr("width", View.svgWidth)
            .attr("height", View.svgHeight)
            .call(View.zoom.on("zoom", () => {
                this.point.zoom();
                this.backgroundMap.zoom();
                this.sizeLegend.zoom();
            }));
        this.histogramSvg = d3.select(".col-4")
            .append("svg")
            .attr("width", View.svgWidth)
            .attr("height", View.histogramSvgHeight)
            .attr("style", "background-color:#f0f0f0")
    }

    setUpBackGroundMap() {
        // -------------------------------------vvvvv has to be done in this way. to avoid the problem of "this" keyword
        this.controller.setUpBackGroundMap((data) => {
            this.backgroundMap.callbackDrawBackGroundMap(data)
        });
    }

    setUpWhiteColorLegend() {
        this.colorLegend.setUpWhiteColor();
    }

    drawDataPointsAndLegends() {
        this.controller.setUpPoints((points) => {
            this.point.callbackDrawPoints(points);
            this.sizeLegend.drawSizeLegend();
            this.colorLegend.updateColor();
            this.histogram.callbackDrawHistogram(points);
            this.histogram.boundToMap(()=>{});
        });
    }

    erasePreviousDrawing() {
        this.point.erase();
        this.sizeLegend.erase();
        this.colorLegend.resetColor();
        this.histogram.erase();
    }

    selectDataSet(dataSet) {
        document.getElementById(View.setSelectorId).innerHTML = dataSet;
        this.erasePreviousDrawing();
        this.controller.setCurrentDataSet(dataSet);
    }

    selectContaminant(contaminant) {
        document.getElementById(View.contaminantSelectorId).innerHTML = contaminant;
        // todo need to figure out what to do when dataset changed and not changed
        this.erasePreviousDrawing();
        this.controller.setCurrentContaminant(contaminant);
        this.drawDataPointsAndLegends();
    }

    static lunch() {
        View.viewInstance = new View();
        View.viewInstance.setUpBackGroundMap();
        View.viewInstance.setUpWhiteColorLegend();
    }

    static selectDataSet(dataSet) {
        if (View.viewInstance === undefined) {
            //todo throw error
        }
        View.viewInstance.selectDataSet(dataSet);
    }

    static selectContaminant(contaminant) {
        if (View.viewInstance === undefined) {
            //todo throw error
        }
        View.viewInstance.selectContaminant(contaminant);
    }

}