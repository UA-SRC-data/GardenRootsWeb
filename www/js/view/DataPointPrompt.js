class DataPointPrompt {
    static colNumber = 10;
    static lineHeight = 18;
    static width = 200;
    static height = 120;

    layer;
    controller;
    tooltip;

    constructor(layer, controller) {
        this.layer = layer;
        this.controller = controller;
        this.tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
    }

    bound() {
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

    resizeCircle = (dom, d, offset) => {
        if (offset === undefined) {
            offset = 0;
        }
        d3.select(dom)
            .transition()
            .duration(150)
            .attr("r", this.controller.getNumberOfSamplePoint(d) + offset);
    };

    hidePrompt = () => {
        this.tooltip.transition()
            .duration(50)
            .style("opacity", 0);
    };

    showPrompt = (d) => {
        let rowNumber = Math.ceil(this.controller.getNumberOfSamplePoint(d) / DataPointPrompt.colNumber);
        let textY = DataPointPrompt.lineHeight * (rowNumber + 1);

        this.tooltip.transition()
            .duration(150)
            .style("opacity", 1);

        this.tooltip.html("")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px");



        //set up the tooltip svg
        let histSvg = this.tooltip.append("svg");
        histSvg.attr("width", DataPointPrompt.width)
            .attr("height", DataPointPrompt.height);



        let currentContaminant = this.controller.getCurrentMineral();
        //get the values and sort them directly
        let protData = this.controller.getAllSampleData(d);
        protData.sort(function (a, b) {
            return a - b;
        });

        //draw the dotmap
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
            .attr("fill",  (d) => {
                return this.controller.calculateColor(d);
            });


        //add text
        histSvg.append("text")
            .attr("x", 10)
            .attr("y", textY)
            .style("font-size", 14)
            .text(()=> {
                return "Average " + Number.parseFloat(this.controller.getSampleAverage(d)).toFixed(1) + " ug/mg";
            });

        histSvg.append("text")
            .attr("x", 10)
            .attr("y", textY + DataPointPrompt.lineHeight)
            .style("font-size", 14)
            .text( () =>{
                return "Median " + this.controller.getSampleMedian(d).toFixed(1) + " ug/mg";
            });

        histSvg.append("text")
            .attr("x", 10)
            .attr("y", textY + 2 * DataPointPrompt.lineHeight)
            .style("font-size", 14)
            .text( () => { //todo need controller
                let percentage = Math.ceil(this.controller.getSampleExceed(d));
                if (percentage === 0) {
                    return "No exceedances";
                }
                return percentage + "% of samples exceed level";
            });
    }


}