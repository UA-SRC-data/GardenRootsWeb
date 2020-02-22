//todo color scale restructure
//todo text for color scale
//todo max
class View {

    static projection = d3.geoAlbersUsa().scale(4500).translate([1750, 100]);
    static geoPath = d3.geoPath().projection(View.projection);
    static zoom = d3.zoom();

    static svgWidth = "100%";
    static svgHeight = "100vh";
    static divClass = ".mapCanvas";
    static setSelectorId = "dataset";
    static contaminantSelectorId = "contaminant";

    static viewInstance = undefined;

    controller;
    model;
    svg;
    point;
    backgroundMap;
    sizeLegend;
    colorLegend;

    constructor() {
        this.model = new Model();
        this.controller = new Controller(this, this.model);
        this.setUpSvg();
        this.backgroundMap = new BackgroundMap(this.svg, this.controller);
        this.point = new Points(this.svg, this.controller);
        this.sizeLegend = new SizeLegend(this.svg, this.controller);
        this.colorLegend = new ColorLegend(this.svg, this.controller);
    }

    setUpSvg() {
        this.svg = d3.select(View.divClass)
            .append("svg")
            .attr("width", View.svgWidth)
            .attr("height", View.svgHeight)
            .call(View.zoom.on("zoom", () => {
                this.point.zoom();
                this.backgroundMap.zoom();
                this.sizeLegend.zoom();
            }));
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
        });
    }

    erasePreviousDrawing() {
        this.point.erase();
        this.sizeLegend.erase();
        this.colorLegend.resetColor();
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
        this.controller.setCurrentMineral(contaminant);
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