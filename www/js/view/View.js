class View {

    static projection = d3.geoAlbersUsa().scale(4500).translate([1750, 100]);
    static geoPath = d3.geoPath().projection(View.projection);
    static zoom = d3.zoom();

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
        this.svg = d3.select(".mapCanvas")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100vh")
            .call(View.zoom.on("zoom", () => {
                //check the d3.event.scale
                //figure out reasonable range
                this.svg.selectAll(".garden")
                    .attr("stroke-width", function (d) {
                        return (0.5) / d3.event.transform.k;
                    });
                this.svg.selectAll(".points")
                    .attr("stroke-width", function (d) {
                        return (0.5) / d3.event.transform.k;
                    });
                this.svg.selectAll(".legendpoints")
                    .attr("stroke-width", function (d) {
                        return (0.5) / d3.event.transform.k;
                    });
                this.svg.selectAll(".legendlabels")
                    .attr("y", function (d) {
                        return 7 / d3.event.transform.k
                    })
                    .style("font-size", function (d) {
                        return 14 / d3.event.transform.k;
                    });
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

    drawDataPoints() {
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
        document.getElementById('dataset').innerHTML = dataSet;
        this.erasePreviousDrawing();
        this.controller.setCurrentDataSet(dataSet);
    }

    selectContaminant(contaminant) {
        document.getElementById('contaminant').innerHTML = contaminant;
        // todo need to figure out what to do when dataset changed and not changed
        this.erasePreviousDrawing();
        this.controller.setCurrentMineral(contaminant);
        this.drawDataPoints();
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