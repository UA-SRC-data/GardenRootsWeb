class Histogram {
    static xOffset = 50;
    static step = 50;

    layer;
    controller;
    selected = new Set();

    constructor(svg, controller) {
        this.layer = svg.append("g");
        this.controller = controller;
    }

    drawYScale = (groupedData) => {
        let yScale = d3.scaleLinear().domain([0, Math.max(...groupedData)]).range([500, 100]);
        this.layer.append("g").attr("transform", "translate(40, 0)").call(d3.axisLeft(yScale));
        return yScale;
    };

    drawXScale = (indexScale) => {
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
        this.layer.append("g").attr("transform", "translate(0, 510)").call(d3.axisBottom(xScale).tickValues(xScale.domain()));
        return xScale;
    };

    generateGroupedData = (data) => {
        let max = Math.max(...data);
        let groupedData = [0, 0, 0, 0, 0, 0];
        let indexScale = d3.scaleQuantize().domain([0, max]).range([0, 1, 2, 3, 4, 5]);
        for (let i = 0; i < data.length; i++) {
            groupedData[indexScale(data[i])]++;
        }
        let xScale = this.drawXScale(indexScale);
        let yScale = this.drawYScale(groupedData);
        let heightScale = d3.scaleLinear().domain([0, Math.max(...groupedData)]).range([0, 400]);

        return groupedData.map((d, i)=>{
            return {
                index: i,
                numberOfPoint: d,
                x: Histogram.xOffset + i * Histogram.step,
                y: yScale(d),
                width: Histogram.step,
                height: heightScale(d),
                range: indexScale.invertExtent(i),
                defaultColor: this.controller.calculateColor(indexScale.invertExtent(i)[1])
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
        let groupedData = this.generateGroupedData(data);

        this.layer
            .selectAll("rect")
            .data(groupedData)
            .enter()
            .append("rect")
            .attr("x", d=>d.x)
            .attr("y", d=>d.y)
            .attr("width",  d=>d.width)
            .attr("height", d=>d.height)
            .attr("stroke", "black")
            .attr("stroke-width", "2px")
            .attr("fill", d=>d.defaultColor);
    };

    boundToMap = (callback) => {
        let self = this;
        this.layer
            .selectAll("rect")
            .on("click", function () {
                if (self.selected.has(this)) {
                    self.selected.delete(this);
                } else {
                    self.selected.add(this);
                }
                self.updateSelectedRect();
                callback()
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
        this.layer.selectAll("rect").style("opacity", 0.3);
        this.selected.forEach((v) => {
            d3.select(v).style("opacity", 1);
        })
    };

    isSelected = (point) => {


    };

    erase = () => {
        this.layer.selectAll("rect").remove();
        this.layer.selectAll("g").remove();
    }


}