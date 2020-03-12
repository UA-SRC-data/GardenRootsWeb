/**
 * This class depicts the circles (points) on the map
 */
class Points {
    /** @member {D3Selection} layer - the svg group for circles */
    layer;
    /** @member {Controller} controller - the controller */
    controller;
    /** @member {DataPointPrompt} dataPointPrompt - a instance of DataPointPrompt */
    dataPointPrompt;

    /**
     * This is the constructor
     * @param {D3Selection} svg - the main svg dom
     * @param {Controller} controller - a instance of controller object
     */
    constructor(svg, controller) {
        this.layer = svg.append("g");
        this.controller = controller;
        this.dataPointPrompt = new DataPointPrompt(this.layer, controller);
    }

    /**
     * This is a callback function that draws circles (Points) on the map
     * @param points
     */
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
        this.dataPointPrompt.boundMouseEventToPoints();
    };

    /**
     * This callback type is called `circleFilter`
     *
     * @callback circleFilter
     * @param {JSON} value
     * @return {Boolean}
     */

    /**
     * This callback type is called `updatePoints`
     *
     * @callback updatePoints
     * @param {D3Selection} value
     */

    /**
     * This is a callback function that is called when user selects a range of data in histogram
     * @see Histogram
     *
     * @param {circleFilter} filter
     * @param {updatePoints} callBack
     */
    update = (filter, callBack) => {
        let filteredPoints = this.layer
            .selectAll("circle")
            .filter(filter);
        callBack(filteredPoints);
    };

    /**
     * This function is called when user zoom in or out.
     */
    zoom = () => {
        this.layer.attr("transform", d3.event.transform);
    };

    /**
     * This function erase all circles (points)
     */
    erase = () => {
        this.layer.selectAll(".points").remove();
        this.layer.selectAll(".points")
            .attr("stroke-width", function (d) {
                return (0.5) / d3.event.transform.k;
            });
    }


}