/**
 * These types are defined to help ide check code and do code completion.
 * @typedef {{heightScale: Object, xScale: Object, yScale: Object, indexScale: Object}} ScaleSet
 *
 * @typedef {{index: Number,
 *            numberOfPoint: Number,
 *            x: Number,
 *            y: Number,
 *            width: Number,
 *            height: Number,
 *            range: Number[],
 *            defaultColor: String }[]} GroupedData
 */




/**
 * This class depicts the histogram
 */
class Histogram {
    /** @type {Number} */
    static xOffset = 50;
    /** @type {Number} */
    static step = 50;

    /**@member {D3Selection} layer - a instance of controller - the svg dom for background map*/
    layer;
    /** @member {Controller} controller - the controller */
    controller;
    /** @member {Set.<D3Selection>} selected */
    selected;
    /** @member {Boolean} hasBeenBound */
    hasBeenBound;

    /**
     * This is the constructor
     * @param {D3Selection} svg - the main svg dom
     * @param {Controller} controller - a instance of controller object
     */
    constructor(svg, controller) {
        this.layer = svg.append("g");
        this.controller = controller;
        this.hasBeenBound = false;
    }

    /**
     * This function draw the x, y axes
     *
     * @param {Object} xScale
     * @param {Object} yScale
     */
    drawAxes = (xScale, yScale) => {
        this.layer.append("g").attr("transform", "translate(40, 0)").call(d3.axisLeft(yScale));
        this.layer.append("g").attr("transform", "translate(0, 510)").call(d3.axisBottom(xScale).tickValues(xScale.domain()));
        this.layer
            .append("text")
            .attr("x", -350)
            .attr("y", 15)
            .attr("transform", "rotate(-90)")
            .text("Number of Point");

        this.layer
            .append("text")
            .attr("x", 100)
            .attr("y", 550)
            .text("Amount of Contaminants ("+ this.controller.getTheUnitForCurrentDataSet()+")" )
    };



    /**
     * This function generates necessary scales
     *
     * @param {Number[]} data - a array of average numbers
     * @return {ScaleSet}
     */
    generateScales = (data) => {
        let max = Math.max(...data);
        let groupedData = [0, 0, 0, 0, 0, 0];
        let indexScale = d3.scaleQuantize().domain([0, max]).range([0, 1, 2, 3, 4, 5]);
        for (let i = 0; i < data.length; i++) {
            groupedData[indexScale(data[i])]++;
        }
        let yScale = d3.scaleLinear().domain([0, Math.max(...groupedData)]).range([500, 100]);
        let heightScale = d3.scaleLinear().domain([0, Math.max(...groupedData)]).range([0, 400]);
        let xScale = d3.scaleLinear()
            .domain([0,
                indexScale.invertExtent(0)[1],
                indexScale.invertExtent(1)[1],
                indexScale.invertExtent(2)[1],
                indexScale.invertExtent(3)[1],
                indexScale.invertExtent(4)[1],
                indexScale.invertExtent(5)[1]])
            .range([Histogram.xOffset,
                Histogram.step + Histogram.xOffset,
                Histogram.step * 2 + Histogram.xOffset,
                Histogram.step * 3 + Histogram.xOffset,
                Histogram.step * 4 + Histogram.xOffset,
                Histogram.step * 5 + Histogram.xOffset,
                Histogram.step * 6 + Histogram.xOffset]);
        return {
            indexScale: indexScale,
            heightScale: heightScale,
            xScale: xScale,
            yScale: yScale
        }
    };


    /**
     * This function groups the data into 6 small ground
     * and calculates necessary info associated with each group
     *
     * @param {Number[]} data
     * @param {ScaleSet} scaleSet
     * @return {GroupedData}
     */
    generateGroupedData = (data, scaleSet) => {
        let groupedData = [0, 0, 0, 0, 0, 0];
        for (let i = 0; i < data.length; i++) {
            groupedData[scaleSet.indexScale(data[i])]++;
        }

        return groupedData.map((d, i) => {
            return {
                index: i,
                numberOfPoint: d,
                x: Histogram.xOffset + i * Histogram.step,
                y: scaleSet.yScale(d),
                width: Histogram.step,
                height: scaleSet.heightScale(d),
                range: scaleSet.indexScale.invertExtent(i),
                defaultColor: this.controller.calculateColor(scaleSet.indexScale.invertExtent(i)[1])
            };
        })

    };

    /**
     * This is a callback function for drawing a histogram.
     *
     * @param {JSON} points
     */
    callbackDrawHistogram = (points) => {
        // preprocess the data
        let data = [];
        for (let i = 0; i < points.length; i++) {
            data.push(this.controller.getSampleAverage(points[i]));
        }
        data.sort((a, b) => {
            return a - b;
        });

        // call function to process data further
        let scaleSet = this.generateScales(data);
        let groupedData = this.generateGroupedData(data, scaleSet);
        this.drawAxes(scaleSet.xScale, scaleSet.yScale);

        // add rect to the map.
        this.layer
            .selectAll("rect")
            .data(groupedData)
            .enter()
            .append("rect")
            .attr("x", d => d.x)
            .attr("y", d => d.y)
            .attr("width", d => d.width)
            .attr("height", d => d.height)
            .attr("stroke", "black")
            .attr("stroke-width", "2px")
            .attr("fill", d => d.defaultColor);
    };


    /**
     * This callback type is called `updateCircle`
     * It should receive a list of points
     * @see Points#update
     * @see circleFilter
     * @see updatePoints
     *
     * @callback updateCircle
     * @param {circleFilter} filter
     * @param {updatePoints} callBack
     */

    /**
     * Call this function to bound the histogram to circle so that
     * when user clicks on rect, the circle in the map can de updated.
     *
     * @param {updateCircle} callback
     */
    boundToMap = (callback) => {
        if (!this.hasBeenBound){
            // todo throw error
            return;
        }
        this.hasBeenBound = true;
        this.selected = new Set();
        let self = this; // this is saved in self
        let resetFilter = (value) =>{
            return true;
        };
        let resetColor = (points) =>{
            points.style("opacity", 1)
        };
        let filter = (value) => {
            return !this.isSelected(this.controller.getSampleAverage(value));
        };
        let newColor = (points) => {
            points.style("opacity", 0)
        };
        this.layer
            .selectAll("rect")
            .on("click", function () { // because we are going to use this to get the D3 selection
                callback(resetFilter, resetColor); // reset selection
                if (self.selected.has(this)) { // if the current rect is already selected
                    self.selected.delete(this);// then this click is seen as cancelling the previous selection
                } else {
                    self.selected.add(this); // otherwise, select it
                }
                self.updateSelectedRect();
                if (self.selected.size!==0) {
                    callback(filter, newColor)
                }
            });
    };

    /**
     * This function unbound this histogram to the map
     */
    unBoundToMap = () => {
        this.layer
            .selectAll("rect")
            .on("click", null);
        this.hasBeenBound = false;
    };


    /**
     * This function actually reduces the opacity of unselected rectangles.
     */
    updateSelectedRect = () => {
        if (this.selected.size === 0) {
            this.layer.selectAll("rect").style("opacity", 1);
            return;
        }
        this.layer.selectAll("rect").style("opacity", 0.1);
        this.selected.forEach((v) => {
            d3.select(v).style("opacity", 1);
        })
    };

    /**
     * This function check if a value is in the ranges of selected rectangles.
     *
     * @param {Number} value
     * @return {boolean}
     */
    isSelected = (value) => {
        for (let e of this.selected) {
            let range = d3.select(e).data()[0].range;
            // allow 0.1 as floating point calculation may not produce the precise value.
            if (range[0]-0.1 <= value && value <= range[1]+0.1) {
                return true;
            }
        }
        return false;

    };

    /**
     * This function erase the histogram.
     */
    erase = () => {
        this.layer.selectAll("rect").remove();
        this.layer.selectAll("g").remove();
        this.layer.selectAll("text").remove();
    }


}