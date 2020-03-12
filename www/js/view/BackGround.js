/**
 * This class depicts the background map
 */
class BackGround {
    /** @member {D3Selection} layer - a instance of controller - the svg dom for background map*/
    layer;
    /** @member {Controller} controller - the controller */
    controller;

    /**
     * This is the constructor
     * @param {D3Selection} svg - the main svg dom
     * @param {Controller} controller - a instance of controller object
     */
    constructor(svg, controller) {
        this.layer = svg.append("g");
        this.controller = controller;
    }

    /**
     * This function is a callback function for drawing circles on map.
     * This function has to be done in this way( (...)=> {...}) to avoid the problem of 'this' key word.
     *
     * @param data
     */
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

    /**
     * This function is called when user zoom in or out,
     * and it resizes the background map.
     */
    zoom = () => {
        this.layer.attr("transform", d3.event.transform);
        this.layer.selectAll(".garden")
            .attr("stroke-width", function (d) {
                return (0.5) / d3.event.transform.k;
            });
    };
}