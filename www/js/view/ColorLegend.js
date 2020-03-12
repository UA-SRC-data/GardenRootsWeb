/**
 * This is the size legend class
 */
class ColorLegend {
    /** @member {D3Selection} scaleG - the svg group for color legend */
    scaleG;
    /** @member {Controller} controller - the controller */
    controller;

    /**
     * This is the constructor
     * @param {D3Selection} svg - the main svg dom
     * @param {Controller} controller - a instance of controller object
     */
    constructor(svg, controller) {
        this.scaleG = svg.append("g");
        this.controller = controller;
    }

    /**
     * This function sets up the color legend with all white color
     */
    setUpWhiteColor = () => {
        // draw the rects
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
        // create the text element with no content.
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
    };

    /**
     * This function resets color of color legend to white.
     */
    resetColor = () => {
        this.scaleG.selectAll("rect").attr("fill", "white");
    };

    /**
     * This function updates the color of color legend.
     * @see controller#isCurrentContaminantAvailableInCurrentDataSet
     * @see controller#getTheRefValueOfCurrentContaminantInCurrentDataSet
     * @see controller#getTheMaxValueOfCurrentContaminantInCurrentDataSet
     * @see controller#getTheUnitForCurrentDataSet
     */
    updateColor = () => {
        // update the color.
        this.scaleG.selectAll(".scaleRects")
            .attr("fill", (d, i) => {
                // todo can be better
                if (this.controller.isCurrentContaminantAvailableInCurrentDataSet()) {
                    return ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#0c2c84'][i];
                } else {
                    let linearColor = d3.scaleLinear()
                        .domain([0, 4])
                        .range(["white", "purple"]);
                    return linearColor(i);
                }
            });

        // update the text content.
        this.scaleG.selectAll(".scalelabels")
            .text((d, i) => {//isCurrentContaminantAvailableInCurrentDataSet
                let top;
                if (this.controller.isCurrentContaminantAvailableInCurrentDataSet()){
                    top = this.controller.getTheRefValueOfCurrentContaminantInCurrentDataSet();
                }else {
                    top = this.controller.getTheMaxValueOfCurrentContaminantInCurrentDataSet();
                }
                let rounded = Math.ceil(top);
                if (i < 5)
                    return (rounded/4) * i;
                else
                    return this.controller.getTheUnitForCurrentDataSet();
            });
    };
}