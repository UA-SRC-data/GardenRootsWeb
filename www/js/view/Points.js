class Points {
    layer;
    controller;

    constructor(svg, controller) {
        this.layer = svg.append("g");
        this.controller = controller;
    }

    callbackDrawPoints = (points) => {
        this.layer
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
            })
    };

    zoom = () => {
        this.layer.attr("transform", d3.event.transform);
    };

    erase = () => {
        this.layer.selectAll(".points").remove();
    }


}