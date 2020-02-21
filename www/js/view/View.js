class View {

    static projection = d3.geoAlbersUsa().scale(4500).translate([1750, 100]);
    static geoPath = d3.geoPath().projection(View.projection);
    static zoom = d3.zoom();

    static viewInstance = undefined;

    controller;
    model;
    svg;
    mapG;
    legendG;


    constructor() {
        this.model = new Model();
        this.controller = new Controller(this, this.model);
        this.setUpSvg();

        this.mapG = this.svg.append("g");
        this.legendG = this.svg.append("g");
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

                this.mapG.attr("transform", d3.event.transform);
                this.legendG.attr("transform", "scale(" + d3.event.transform.k + ")")

            }));
    }

    setUpBackGroundMap() {
        // -------------------------------------vvvvv has to be done in this way. to avoid the problem of "this" keyword
        this.controller.setUpBackGroundMap((path) => {
            d3.json(path).then(this.callbackDrawBackGroundMap);
        });
    }

    // this function has to be done in this way( (...)=> {...}) to avoid the problem of 'this' key word
    callbackDrawBackGroundMap = (json) => {
        //draw the map
        this.mapG.selectAll("path")
            .data(json.features) // todo need change
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

    drawLegendPoints = ()=>{
        let prev = 0;
        let dist = 20;
        let data = this.controller.getLegendPoints();
        this.legendG.selectAll("circle")
            .data(data)
            .enter()
            .append("svg:circle")
            .attr("class", "legendpoints")
            .attr("transform", function(d) {
                let trans = "translate(" + (dist+d.r) + "," + (prev+dist+d.r) + ")";
                prev = prev+dist+d.r*2;
                return trans;
            })
            .attr("r", function(d){
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
            .attr("transform", function(d) {
                let trans = "translate(" + (2*dist + 2*d.r) + "," + (prev+dist+d.r) + ")";
                prev = prev+dist+d.r*2;
                return trans;
            })
            .style("font-size",14)
            .text(function(d) { if (d.r === 1){ return "1 sample";} else {return d.sample;}});
    };

    setUpDataPoints() {
        this.controller.setUpPoints((points) => {
            this.callbackDrawPoints(points);
            this.drawLegendPoints();
        });
    }

    cleanUpDataPoints() {
        this.mapG.selectAll(".points").remove();
    }

    callbackDrawPoints = (points) => {
        this.mapG
            .selectAll("circle")
            .data(points)
            .enter()
            .append("svg:circle")
            .attr("class", "points")
            .attr("transform", function (d) {
                return "translate(" + View.projection(d.coordinates) + ")";
            })
            .attr("r", (d) => {
                return this.controller.calculateSize(d)
            })
            .attr("stroke", "black")
            .attr("stroke-width", 0.5)
            .attr("fill", (d) => {
                return this.controller.calculateColor(d)
            })// todo change
    };

    selectDataSet(dataSet) {
        document.getElementById('dataset').innerHTML = dataSet;
        this.cleanUpDataPoints();
        this.controller.setCurrentDataSet(dataSet);
    }

    selectContaminant(contaminant) {
        document.getElementById('contaminant').innerHTML = contaminant;
        // todo need to figure out what to do when dataset changed and not changed
        this.cleanUpDataPoints();
        this.controller.setCurrentMineral(contaminant);
        this.setUpDataPoints();
    }

    static lunch() {
        View.viewInstance = new View();
        View.viewInstance.setUpBackGroundMap()

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