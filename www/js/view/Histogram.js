class Histogram {
    static numberOfStep = 6;

    layer;
    controller;
    dataPointPrompt;
    xOffset = 50;
    step = 50;

    constructor(svg, controller) {
        this.layer = svg.append("g");
        this.controller = controller;
        this.dataPointPrompt = new DataPointPrompt(this.layer, controller);
    }

    callbackDrawHistogram = (points) => {
        // get the average of each point.
        let data = points.map((v) => this.controller.getSampleAverage(v));
        data.sort((a, b) => a - b);

        let max = Math.max(...data);
        let groupedData = [0, 0, 0, 0, 0, 0];
        let value2IndexScale = d3.scaleQuantize().domain([0, max]).range([0, 1, 2, 3, 4, 5]);
        for (let i = 0; i < data.length; i++) {
            groupedData[value2IndexScale(data[i])]++;
        }
        let number2HeightScale = d3.scaleLinear().domain([0, Math.max(...groupedData)]).range([0, 400]);
        //let xScale = heightScale.reverse;
        let yScale = d3.scaleLinear().domain([0, Math.max(...groupedData)]).range([500, 100]);
        let xScale = d3.scaleLinear() //value2position
            .domain([0,
                value2IndexScale.invertExtent(0)[1],
                value2IndexScale.invertExtent(1)[1],
                value2IndexScale.invertExtent(2)[1],
                value2IndexScale.invertExtent(3)[1],
                value2IndexScale.invertExtent(4)[1],
                value2IndexScale.invertExtent(5)[1]])
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
                return number2HeightScale(d);
            })
            .attr("stroke", "black")
            .attr("stroke-width", "2px")
            .attr("fill", (d, i) => {
                return this.controller.calculateColor(value2IndexScale.invertExtent(i)[1]);
            });
        this.layer.append("g").attr("transform", "translate(40, 0)").call(d3.axisLeft(yScale));
        this.layer.append("g").attr("transform", "translate(0, 510)").call(d3.axisBottom(xScale).tickValues(xScale.domain()));
    };

    erase = () => {
        this.layer.selectAll("rect").remove();
        this.layer.selectAll("g").remove();
    }


}