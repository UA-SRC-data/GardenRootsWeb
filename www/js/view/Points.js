class Points {
    layer;
    controller;
    dataPointPrompt;

    constructor(svg, controller) {
        this.layer = svg.append("g");
        this.controller = controller;
        this.dataPointPrompt = new DataPointPrompt(this.layer, controller);
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
            });
        this.dataPointPrompt.bound();
    };

    update = (filter, callBack) => {
        let filteredPoints = this.layer
            .selectAll("circle")
            .filter(filter);
        callBack(filteredPoints);
    };

    zoom = () => {
        this.layer.attr("transform", d3.event.transform);
    };

    erase = () => {
        this.layer.selectAll(".points").remove();
        this.layer.selectAll(".points")
            .attr("stroke-width", function (d) {
                return (0.5) / d3.event.transform.k;
            });
    }


}