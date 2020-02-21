class ColorLegend {
    scaleG;
    controller;

    constructor(svg, controller) {
        this.scaleG = svg.append("g");
        this.controller = controller;
    }

    setUpWhiteColor = () => {
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

    resetColor = () => {
        this.scaleG.selectAll("rect").attr("fill", "white");
    };

    updateColor = () => {
        this.scaleG.selectAll(".scaleRects")
            .attr("fill", (d, i) => {
                if (this.controller.isCurrentMineralAvailableInCurrentDataSet()) {
                    return ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#0c2c84'][i];
                } else {
                    let linearColor = d3.scaleLinear()
                        .domain([0, 4])
                        .range(["white", "purple"]);
                    return linearColor(i);
                }
            });

        /*
        this.scaleG.selectAll(".scalelabels")
            .text(function(d, i) {
                var top = refs.hasOwnProperty(contaminant) ? refs[contaminant] : maxes[contaminant];
                var rounded = Math.ceil(top);
                if (i < 5)
                    return (rounded/4) * i;
                else
                    return units[globalDataset];
            });*/
    };
}