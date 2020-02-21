class BackgroundMap {
    layer;
    controller;

    constructor(svg, controller) {
        this.layer = svg.append("g");
        this.controller = controller;
    }

    // this function has to be done in this way( (...)=> {...}) to avoid the problem of 'this' key word
    callbackDrawBackGroundMap = (data) => {
        //draw the map
        this.layer.selectAll("path")
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

    zoom = () => {
        this.layer.attr("transform", d3.event.transform);
    };
}