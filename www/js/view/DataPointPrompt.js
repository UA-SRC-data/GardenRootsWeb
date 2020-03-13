/**
 * This class depicts the prompt.
 */
class DataPointPrompt {
    /** @type {number} */
    static colNumber = 10;
    /** @type {number} */
    static lineHeight = 18;
    /** @type {number} */
    static width = 200;
    /** @type {number} */
    static height = 120;

    /** @member {D3Selection} layer - the svg dom for background map*/
    layer;
    /** @member {Controller} controller - the controller */
    controller;
    /** @member {D3Selection} tooltip - the svg dom for prompt*/
    tooltip;

    /**
     * This is the constructor.
     *
     * @param {D3Selection} layer - the main svg dom
     * @param {Controller} controller - a instance of controller object
     */
    constructor(layer, controller) {
        this.layer = layer;
        this.controller = controller;
        this.tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
    }

    /**
     * This function bounds mouse event to each circles.
     * @see DataPointPrompt#resizeCircle
     * @see DataPointPrompt#hidePrompt
     * @see DataPointPrompt#showPrompt
     */
    boundMouseEventToPoints() {
        // need to preserve context.
        let resizeCircle = this.resizeCircle;
        let hidePrompt = this.hidePrompt;
        let showPrompt = this.showPrompt;

        this.layer
            .selectAll("circle")
            .on("mouseenter", function (d) {
                resizeCircle(this, d, 2);
                showPrompt(d);
            })
            .on("mouseleave", function (d) {
                resizeCircle(this, d);
                hidePrompt();
            });
    }

    /**
     * This function resizes circles.
     * A circle should be bigger when mouse is on it
     *
     * @param {D3Selection} dom
     * @param {dataPointWithAssociatedInfo} d
     * @param {Number} [offset=0]
     */
    resizeCircle = (dom, d, offset) => {
        if (offset === undefined) {
            offset = 0;
        }
        d3.select(dom)
            .transition()
            .duration(150)
            .attr("r", d.size+ offset);
    };

    /**
     * This function is a callback function that hides the prompt
     */
    hidePrompt = () => {
        this.tooltip.transition()
            .duration(50)
            .style("opacity", 0);
    };

    /**
     * This function is a callback function that shows the prompt
     * @see DataPointPrompt#addAverageInfo
     * @see DataPointPrompt#addMedianInfo
     * @see DataPointPrompt#addExceedingSampleInfo
     *
     * @param {dataPointWithAssociatedInfo} d
     */
    showPrompt = (d) => {
        this.tooltip.transition()
            .duration(150)
            .style("opacity", 1);

        this.tooltip.html("")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px");

        let rowNumber = Math.ceil(d.numPoints / DataPointPrompt.colNumber);
        let textY = DataPointPrompt.lineHeight * (rowNumber + 1);

        //set up the tooltip svg
        let histSvg = this.tooltip.append("svg");
        histSvg.attr("width", DataPointPrompt.width)
            .attr("height", DataPointPrompt.height);

        //draw the dotmap
        this.addDotMap(histSvg, d);

        //add text
        this.addAverageInfo(histSvg, textY, d);
        this.addMedianInfo(histSvg, textY, d);
        this.addExceedingSampleInfo(histSvg, textY, d);
    };

    /**
     * This function adds the dot map to the prompt
     *
     * @param {D3Selection} histSvg
     * @param {dataPointWithAssociatedInfo} d
     */
    addDotMap = (histSvg, d) => {
        //get the values and sort them directly
        let protData = d.samples;
        protData.sort((a, b) => {
            return a - b;
        });
        histSvg.selectAll("circle")
            .data(protData).enter()
            .append("svg:circle")
            .attr("class", "dotmap")
            .attr("transform", function (d, i) {
                let row = Math.floor(i / DataPointPrompt.colNumber);
                let col = i % DataPointPrompt.colNumber;
                return "translate(" + (col + 1) * 15 + "," + ((row + 1) * 15) + ")";
            })
            .attr("r", 5)
            .attr("stroke", "black")
            .attr("stroke-width", 0.5)
            .attr("fill", (d) => {
                return this.controller.calculateColor(d);
            });
    };

    /**
     * This function adds the average number to the prompt.
     *
     * @param {D3Selection} histSvg
     * @param {Number} textY
     * @param {dataPointWithAssociatedInfo} d
     */
    addAverageInfo = (histSvg, textY, d) => {
        histSvg.append("text")
            .attr("x", 10)
            .attr("y", textY)
            .style("font-size", 14)
            .text(() => {
                return "Average " + Number(d.average).toFixed(1) + " ug/mg";
            });
    };

    /**
     * This function adds the median number to the prompt.
     *
     * @param {D3Selection} histSvg
     * @param {Number} textY
     * @param {dataPointWithAssociatedInfo} d
     */
    addMedianInfo = (histSvg, textY, d) => {
        histSvg.append("text")
            .attr("x", 10)
            .attr("y", textY + DataPointPrompt.lineHeight)
            .style("font-size", 14)
            .text(() => {
                return "Median " + d.median.toFixed(1) + " ug/mg";
            });
    };

    /**
     * This function adds the info of exceeding samples to the prompt.
     *
     * @param {D3Selection} histSvg
     * @param {Number} textY
     * @param {dataPointWithAssociatedInfo} d
     */
    addExceedingSampleInfo = (histSvg, textY, d) => {
        histSvg.append("text")
            .attr("x", 10)
            .attr("y", textY + 2 * DataPointPrompt.lineHeight)
            .style("font-size", 14)
            .text(() => {
                let percentage = Math.ceil(d.exceed);
                if (percentage === 0) {
                    return "No exceedances";
                }
                return percentage + "% of samples exceed level";
            });
    };


}