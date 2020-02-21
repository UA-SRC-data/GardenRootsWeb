class Points {
    mapG;
    controller;

    constructor(mpg, controller) {
        this.mapG = mpg;
        this.controller = controller;
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
            })
    };

    zoom = () => {
        this.mapG.attr("transform", d3.event.transform);
    };

    erase = () => {
        this.mapG.selectAll(".points").remove();
    }


}