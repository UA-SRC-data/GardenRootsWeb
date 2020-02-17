class View {

    static projection = d3.geo.albersUsa().scale(4500).translate([1750,100]);
    static geoPath = d3.geo.path().projection(View.projection);

    controller;
    model;
    svg;
    mapG;


    constructor() {
        this.model = new Model();
        this.controller = new Controller(this, this.model);
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

        this.mapG = this.svg.append("g");
        debugger;
    }

    callbackDrawGroundMap(path, mapG) {
        //draw the map

        debugger;
        d3.json(path, function (err, json) {

            //check error
            if (err) {
                console.log(err);
            }

            //draw the map
            debugger;
            mapG.selectAll("path")
                .data(json.features)
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
            debugger;
        });
    }

    setUPBackGroundMap() {
        let mapG = this.mapG;
        let callBack = this.callbackDrawGroundMap;


        this.controller.setUPBackGroundMap(function (path) {
            callBack(path, mapG);
        });
    }

    static lunch() {
        let view = new View();
        debugger;
        view.setUPBackGroundMap()

    }


}