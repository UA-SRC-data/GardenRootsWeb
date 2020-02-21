class View {

    static projection = d3.geoAlbersUsa().scale(4500).translate([1750, 100]);
    static geoPath = d3.geoPath().projection(View.projection);

    static viewInstance = undefined;

    controller;
    model;
    svg;
    mapG;


    constructor() {
        this.model = new Model();
        this.controller = new Controller(this, this.model);
        this.setUpSvg();

        this.mapG = this.svg.append("g");
    }

    setUpSvg(){
        this.svg = d3.select(".mapCanvas")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100vh")
        //todo needs modify
        /*
        .call(zoom.on("zoom", function () {
            //check the d3.event.scale
            //figure out reasonable range
            svg.selectAll(".garden")
                .attr("stroke-width", function (d) {
                    return (0.5) / d3.event.scale;
                });
            svg.selectAll(".points")
                .attr("stroke-width", function (d) {
                    return (0.5) / d3.event.scale;
                });

            svg.selectAll(".legendpoints")
                .attr("stroke-width", function (d) {
                    return (0.5) / d3.event.scale;
                });

            svg.selectAll(".legendlabels")
                .attr("y", function (d) {
                    return 7 / d3.event.scale
                })
                .style("font-size", function (d) {
                    return 14 / d3.event.scale;
                });

            mapG.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
            legendG.attr("transform", "scale(" + d3.event.scale + ")")

        }))*/;
    }

    setUpBackGroundMap() {
        // -------------------------------------vvvvv has to be done in this way. to avoid the problem of "this" keyword
        this.controller.setUpBackGroundMap((path) => {
            d3.json(path).then(this.callbackDrawGroundMap);
        });
    }

    // this function has to be done in this way( (...)=> {...}) to avoid the problem of 'this' key word
    callbackDrawGroundMap = (json, err) => {
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

    setUpDataPoints() {
        this.controller.setUpPoints((points)=>{this.callbackDrawPoints(points)});
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
            .attr("r", (d)=>{return this.controller.calculateSize(d)})
            .attr("stroke", "black")// todo change
            .attr("stroke-width", 0.5)
            .attr("fill", (d)=>{return this.controller.calculateColor(d)})// todo change
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