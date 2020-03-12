//todo color scale restructure
//todo callback for cleaning
//todo what is ref????

/**
 * This type is defined to help ide check code and do code completion.
 * @typedef D3Selection
 * @type {Object}
 * @property {function} select
 * @property {function} selectAll
 * @property {function} append
 * @property {function} attr
 * @property {function} style
 */


/**
 * This class manages all other view components.
 * @see Controller
 * @see Model
 */
class View {

    /** @type {Object}*/
    static projection = d3.geoAlbersUsa().scale(4500).translate([1750, 100]);
    /** @type {Object}*/
    static geoPath = d3.geoPath().projection(View.projection);
    /** @type {Object}*/
    static zoom = d3.zoom();

    /** @type {String}*/
    static svgWidth = "100%";
    /** @type {String}*/
    static svgHeight = "100vh";
    /** @type {String}*/
    static divClass = ".mapCanvas";
    /** @type {String}*/
    static setSelectorId = "dataset";
    /** @type {String}*/
    static contaminantSelectorId = "contaminant";

    /** @type {Number}*/
    static histogramSvgHeight = 600;
    /** @type {View}*/
    static viewInstance = undefined;

    /** @member {Controller} controller - a instance of controller */
    controller;
    /** @member {Model} model - a instance of model*/
    model;
    /** @member {D3Selection} mainSvg - the svg dom*/
    mainSvg;
    /** @member {D3Selection} histogramSvg - the histogram dom*/
    histogramSvg;
    /** @member {Points} point - a instance of Points*/
    point;
    /** @member {BackGround} background - a instance of BackGround*/
    background;
    /** @member {SizeLegend} sizeLegend - a instance of SizeLegend*/
    sizeLegend;
    /** @member {ColorLegend} colorLegend - a instance of ColorLegend*/
    colorLegend;
    /** @member {Histogram} histogram- a instance of Histogram*/
    histogram;


    /**
     * This is the constructor
     * @see View#setUpSvg
     * @see BackGround
     * @see Points
     * @see SizeLegend
     * @see ColorLegend
     * @see Histogram
     */
    constructor() {
        this.model = new Model();
        this.controller = new Controller(this.model);
        this.setUpSvg();
        this.background = new BackGround(this.mainSvg, this.controller);
        this.point = new Points(this.mainSvg, this.controller);
        this.sizeLegend = new SizeLegend(this.mainSvg, this.controller);
        this.colorLegend = new ColorLegend(this.mainSvg, this.controller);
        this.histogram = new Histogram(this.histogramSvg, this.controller);
    }

    /**
     * This function sets up all svg in the dom tree,
     * which are the one for the main graph and the one for histogram.
     */
    setUpSvg() {
        this.mainSvg = d3.select(View.divClass)
            .append("svg")
            .attr("width", View.svgWidth)
            .attr("height", View.svgHeight)
            .call(View.zoom.on("zoom", () => {
                this.point.zoom();
                this.background.zoom();
                this.sizeLegend.zoom();
            }));
        this.histogramSvg = d3.select(".col-4")
            .append("svg")
            .attr("width", View.svgWidth)
            .attr("height", View.histogramSvgHeight)
            .attr("style", "background-color:#f0f0f0")
    }

    /**
     * This function sets up the background map
     * @see Controller#setUpBackGroundMap
     * @see BackGround#callbackDrawBackGroundMap
     */
    setUpBackGroundMap() {
        // -------------------------------------vvvvv has to be done in this way. to avoid the problem of "this" keyword
        this.controller.setUpBackGroundMap((data) => {
            this.background.callbackDrawBackGroundMap(data)
        });
    }

    /**
     * This function sets up the color legend with white color
     * @see ColorLegend#setUpWhiteColor
     */
    setUpWhiteColorLegend() {
        this.colorLegend.setUpWhiteColor();
    }

    /**
     * This function calls all other function to draw data points and all legends.
     * @see Controller#setUpPoints
     * @see Points#callbackDrawPoints
     * @see SizeLegend#drawSizeLegend
     * @see ColorLegend#updateColor
     * @see Histogram#callbackDrawHistogram
     * @see Histogram#boundToMap
     * @see Points#update
     */
    drawDataPointsAndLegends() {
        this.controller.setUpPoints((points) => {
            this.point.callbackDrawPoints(points);
            this.sizeLegend.drawSizeLegend();
            this.colorLegend.updateColor();
            this.histogram.callbackDrawHistogram(points);
            this.histogram.boundToMap(this.point.update);
        });
    }

    /**
     * This function cleans up all previous drawing.
     * @see Points#erase
     * @see SizeLegend#erase
     * @see ColorLegend#resetColor
     * @see Histogram#erase
     */
    erasePreviousDrawing() {
        this.point.erase();
        this.sizeLegend.erase();
        this.colorLegend.resetColor();
        this.histogram.erase();
    }

    /**
     * This function is called when user selects a new data set.
     * It calls other functions to erase the points and legend,
     * but it does not call function to redraw them
     * because contaminant has also to be selected.
     * @see View#erasePreviousDrawing
     * @see Controller#setCurrentDataSet
     *
     * @param {String} dataSet  - the name of the data set
     */
    selectDataSet(dataSet) {
        document.getElementById(View.setSelectorId).innerHTML = dataSet;
        this.erasePreviousDrawing();
        this.controller.setCurrentDataSet(dataSet);
    }

    /**
     * This function is called when suer selects a new contaminant.
     * It erase previous points and legend
     * It only draws new data points and legend when data set is selected.
     * @see View#erasePreviousDrawing
     * @see Controller#setCurrentContaminant
     * @see Controller#isCurrentDataSetNull
     * @see View#drawDataPointsAndLegends
     *
     * @param {String} contaminant
     */
    selectContaminant(contaminant) {
        document.getElementById(View.contaminantSelectorId).innerHTML = contaminant;
        this.erasePreviousDrawing();
        this.controller.setCurrentContaminant(contaminant);
        if (!this.controller.isCurrentDataSetNull()){
            this.drawDataPointsAndLegends();
        }
    }

    /**
     * Call this function to lunch this visualization
     * @see View#setUpBackGroundMap
     * @see View#setUpWhiteColorLegend
     */
    static lunch() {
        View.viewInstance = new View();
        View.viewInstance.setUpBackGroundMap();
        View.viewInstance.setUpWhiteColorLegend();
    }

    /**
     * This function is called when user selects data set.
     * @see View#selectDataSet
     *
     * @param {String} dataSet
     */
    static selectDataSet(dataSet) {
        if (View.viewInstance === undefined) {
            //todo throw error
        }
        View.viewInstance.selectDataSet(dataSet);
    }

    /**
     * This function is called when user selects contaminant.
     * @see View#selectContaminant
     *
     * @param {String} contaminant
     */
    static selectContaminant(contaminant) {
        if (View.viewInstance === undefined) {
            //todo throw error
        }
        View.viewInstance.selectContaminant(contaminant);
    }

}