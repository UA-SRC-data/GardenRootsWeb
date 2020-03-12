class Histogram {
    static xOffset = 50;
    static step = 50;

    layer;
    controller;
    selected;

    constructor(svg, controller) {
        this.layer = svg.append("g");
        this.controller = controller;
    }

    drawAxis = (xScale, yScale) => {
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

    callbackDrawHistogram = (points) => {
        let data = [];
        for (let i = 0; i < points.length; i++) {
            data.push(this.controller.getSampleAverage(points[i]));
        }
        data.sort((a, b) => {
            return a - b;
        });

        let scaleSet = this.generateScales(data);
        let groupedData = this.generateGroupedData(data, scaleSet);
        this.drawAxis(scaleSet.xScale, scaleSet.yScale);

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

    boundToMap = (callback) => {
        this.selected = new Set();
        let self = this;
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
            .on("click", function () {
                callback(resetFilter, resetColor);
                if (self.selected.has(this)) {
                    self.selected.delete(this);
                } else {
                    self.selected.add(this);
                }
                self.updateSelectedRect();
                if (self.selected.size!==0) {
                    callback(filter, newColor)
                }
            });
    };

    unBoundToMap = () => {
        this.layer
            .selectAll("rect")
            .on("click", null)
    };


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

    isSelected = (value) => {
        for (let e of this.selected) {
            let range = d3.select(e).data()[0].range;
            if (range[0]-0.1 <= value && value <= range[1]+0.1) {
                return true;
            }
        }
        return false;

    };

    erase = () => {
        this.layer.selectAll("rect").remove();
        this.layer.selectAll("g").remove();
        this.layer.selectAll("text").remove();
    }


}