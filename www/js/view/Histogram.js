class Histogram {
    layer;
    controller;
    dataPointPrompt;
    xOffset = 50;
    step = 50;
    selected = new Set();

    constructor(svg, controller) {
        this.layer = svg.append("g");
        this.controller = controller;
        this.dataPointPrompt = new DataPointPrompt(this.layer, controller);
    }

    callbackDrawHistogram = (points) => {
        let data = [];
        for (let i = 0; i < points.length; i++) {
            data.push(this.controller.getSampleAverage(points[i]));
        }
        data.sort((a, b) => {
            return a - b;
        });
        let max = Math.max(...data);
        let groupedData = [0, 0, 0, 0, 0, 0];
        let indexScale = d3.scaleQuantize().domain([0, max]).range([0, 1, 2, 3, 4, 5]);
        for (let i = 0; i < data.length; i++) {
            groupedData[indexScale(data[i])]++;
        }
        let heightScale = d3.scaleLinear().domain([0, Math.max(...groupedData)]).range([0, 400]);
        //let xScale = heightScale.reverse;
        let yScale = d3.scaleLinear().domain([0, Math.max(...groupedData)]).range([500, 100]);
        let xScale = d3.scaleLinear()
            .domain([0,
                indexScale.invertExtent(0)[1],
                indexScale.invertExtent(1)[1],
                indexScale.invertExtent(2)[1],
                indexScale.invertExtent(3)[1],
                indexScale.invertExtent(4)[1],
                indexScale.invertExtent(5)[1]])
            .range([this.xOffset,
                this.step + this.xOffset,
                this.step * 2 + this.xOffset,
                this.step * 3 + this.xOffset,
                this.step * 4 + this.xOffset,
                this.step * 5 + this.xOffset,
                this.step * 6 + this.xOffset]);

        this.layer
            .selectAll("rect")
            .data(groupedData)
            .enter()
            .append("rect")
            .attr("x", (d, i) => {
                return this.xOffset + i * this.step;
            })
            .attr("y", (d, i) => {
                return yScale(d);
            })
            .attr("width", (d, i) => {
                return this.step;
            })
            .attr("height", (d, i) => {
                return heightScale(d);
            })
            .attr("stroke", "black")
            .attr("stroke-width", "2px")
            .attr("fill", (d, i) => {
                return this.controller.calculateColor(indexScale.invertExtent(i)[1]);
            });
        this.layer.append("g").attr("transform", "translate(40, 0)").call(d3.axisLeft(yScale));
        this.layer.append("g").attr("transform", "translate(0, 510)").call(d3.axisBottom(xScale).tickValues(xScale.domain()));
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
            });

    };

    unBoundToMap = () => {
        //todo unbound.
    };


    updateSelectedRect = () => {
        if (this.selected.size===0){
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