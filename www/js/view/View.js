class View {

    static projection = d3.geoAlbersUsa().scale(4500).translate([1750, 100]);
    static geoPath = d3.geoPath().projection(View.projection);
    static zoom = d3.zoom();

    static viewInstance = undefined;

    controller;
    model;
    svg;
    point;
    mapG;
    legendG;
    scaleG;


    constructor() {
        this.model = new Model();
        this.controller = new Controller(this, this.model);
        this.setUpSvg();
        this.mapG = this.svg.append("g");
        this.point = new Points(this.mapG, this.controller);


        this.legendG = this.svg.append("g");
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
                this.legendG.attr("transform", "scale(" + d3.event.transform.k + ")")
            }));
    }

    setUpBackGroundMap() {
        // -------------------------------------vvvvv has to be done in this way. to avoid the problem of "this" keyword
        this.controller.setUpBackGroundMap((data) => {
            this.callbackDrawBackGroundMap(data)
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

    // this function has to be done in this way( (...)=> {...}) to avoid the problem of 'this' key word
    callbackDrawBackGroundMap = (data) => {
        //draw the map
        this.mapG.selectAll("path")
            .data(data) // todo need change
            .enter()
            .append("path")
            .attr("class", "garden")
            .attr("d", View.geoPath)
            .attr("stroke-width", 0.5)
            .attr("stroke", function (d) { //light grey for roads, black for outline
                if (d.properties && d.properties.hasOwnProperty("FULLNAME")) {
                    return "lightgrey";
                }
                return "black";
            })
            .attr("z-index", -1)
            .attr("opacity", 1)
            .attr('fill', 'transparent');
    };


    drawDataPoints() {
        this.controller.setUpPoints((points) => {
            this.point.callbackDrawPoints(points);
            this.drawSizeLegend();
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

    drawSizeLegend = () => {
        let prev = 0;
        let dist = 20;
        let data = this.controller.getLegendPoints();
        this.legendG.selectAll("circle")
            .data(data)
            .enter()
            .append("svg:circle")
            .attr("class", "legendpoints")
            .attr("transform", function (d) {
                let trans = "translate(" + (dist + d.r) + "," + (prev + dist + d.r) + ")";
                prev = prev + dist + d.r * 2;
                return trans;
            })
            .attr("r", function (d) {
                return d.r;
            })
            .attr("stroke", "black")
            .attr("stroke-width", 0.5)
            .attr("fill", "white");
        prev = 0;
        this.legendG.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("y", 7)
            .attr("class", "legendlabels")
            .attr("transform", function (d) {
                let trans = "translate(" + (2 * dist + 2 * d.r) + "," + (prev + dist + d.r) + ")";
                prev = prev + dist + d.r * 2;
                return trans;
            })
            .style("font-size", 14)
            .text(function (d) {
                if (d.r === 1) {
                    return "1 sample";
                } else {
                    return d.sample;
                }
            });
    };

    erasePreviousDrawing() {
        this.point.erase();
        this.legendG.selectAll(".legendpoints").remove();
        this.legendG.selectAll(".legendlabels").remove();
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