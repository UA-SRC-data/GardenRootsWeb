class SizeLegend {
    legendG;
    controller;

    constructor(svg, controller) {
        this.legendG = svg.append("g");
        this.controller = controller;
    }

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

    zoom = () => {
        this.legendG.attr("transform", "scale(" + d3.event.transform.k + ")")
        this.legendG.selectAll(".legendpoints")
            .attr("stroke-width", function (d) {
                return (0.5) / d3.event.transform.k;
            });
        this.legendG.selectAll(".legendlabels")
            .attr("y", function (d) {
                return 7 / d3.event.transform.k
            })
            .style("font-size", function (d) {
                return 14 / d3.event.transform.k;
            });
    };

    erase = () => {
        this.legendG.selectAll(".legendpoints").remove();
        this.legendG.selectAll(".legendlabels").remove();
    }
}