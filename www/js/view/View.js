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
    scaleG;

    constructor() {
        this.model = new Model();
        this.controller = new Controller(this, this.model);
        this.setUpSvg();
        this.backgroundMap = new BackgroundMap(this.svg, this.controller);
        this.point = new Points(this.svg, this.controller);
        this.sizeLegend = new SizeLegend(this.svg, this.controller);

        this.scaleG = this.svg.append("g");
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
        this.scaleG.selectAll("rect")
            .data([1, 2, 3, 4, 5]).enter()
            .append("svg:rect")
            .attr("class", "scaleRects")
            .attr("x", function (d) {
                return 60 * d;
            })
            .attr("y", "85vh")
            .attr("width", 50)
            .attr("height", 50)
            .attr("stroke", "black")
            .attr("stroke-width", 0.5)
            .attr("fill", "white");
        this.scaleG.selectAll("text")
            .data([1, 2, 3, 4, 5, 6]).enter()
            .append("text")
            .attr("y", "94vh")
            .attr("x", function (d) {
                return 60 * d;
            })
            .attr("text-anchor", "middle")
            .attr("class", "scalelabels")
            .style("font-size", 14)
            .text("");
    }

    resetColorLegend() {
        this.scaleG.selectAll("rect").attr("fill", "white");
    }

    drawDataPoints() {
        this.controller.setUpPoints((points) => {
            this.point.callbackDrawPoints(points);
            this.sizeLegend.drawSizeLegend();
            this.updateColorLegend();
        });
    }

    updateColorLegend = () => {
        this.scaleG.selectAll(".scaleRects")
            .attr("fill", (d, i) => {
                if (this.controller.isCurrentMineralAvailableInCurrentDataSet()) {
                    return ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#0c2c84'][i];
                } else {
                    var linearColor = d3.scaleLinear()
                        .domain([0, 4])
                        .range(["white", "purple"]);
                    return linearColor(i);
                }
            });

        /*
        this.scaleG.selectAll(".scalelabels")
            .text(function(d, i) {
                var top = refs.hasOwnProperty(contaminant) ? refs[contaminant] : maxes[contaminant];
                var rounded = Math.ceil(top);
                if (i < 5)
                    return (rounded/4) * i;
                else
                    return units[globalDataset];
            });*/
    };

    erasePreviousDrawing() {
        this.point.erase();
        this.sizeLegend.erase();
        this.resetColorLegend();
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