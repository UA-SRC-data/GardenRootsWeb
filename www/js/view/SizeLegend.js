/**
 * This is the size legend class
 */
class SizeLegend {
    /** @member {D3Selection} legendG - the svg group for size legend */
    legendG;
    /** @member {Controller} controller - the controller */
    controller;

    /**
     * This is the constructor
     * @param {D3Selection} svg - the main svg dom
     * @param {Controller} controller - a instance of controller object
     */
    constructor(svg, controller) {
        this.legendG = svg.append("g");
        this.controller = controller;
    }

    /**
     * This function draws size legend
     */
    drawSizeLegend = () => {
        let prev = 0;
        let dist = 20;
        // getLegendPoints will return a array of numbers
        let data = this.controller.getLegendPoints();

        // draw the circles
        this.legendG.selectAll("circle")
            .data(data)
            .enter()
            .append("svg:circle")
            .attr("class", "legendpoints")
            .attr("transform", function (d) { // use translate to position the circle
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
        prev = 0; //reset prev to write numbers of samples circles represent
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

    /**
     * This function is called when user zoom in or out,
     * and it resizes the circles to correspond the size of points in map.
     */
    zoom = () => {
        this.legendG.attr("transform", "scale(" + d3.event.transform.k + ")");
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

    /**
     * This function erase all previous drawing
     */
    erase = () => {
        this.legendG.selectAll(".legendpoints").remove();
        this.legendG.selectAll(".legendlabels").remove();
    }
}