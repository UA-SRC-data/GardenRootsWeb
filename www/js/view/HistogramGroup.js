class HistogramGroup {
    /** @member {Histogram} bigHistogram- a instance of Histogram*/
    bigHistogram;
    /** @member {SmallHistogram[]} smallMultipleHistograms- a array of histograms*/
    smallMultipleHistograms = [];
    /**@member {D3Selection} svg - the svg dom for histogram*/
    svg;
    /** @member {Controller} controller - a instance of controller */
    controller;
    selectContaminant;

    /**
     * This is the constructor.
     * @param {D3Selection} svg - the svg dom for histogram
     * @param {Controller} controller - a instance of controller object
     */
    constructor(svg, controller, selectContaminant) {
        this.svg = svg;
        this.controller = controller;
        this.bigHistogram = new Histogram(svg, controller);
        this.selectContaminant = selectContaminant;
    }

    setUpSmallMultipleHistograms() {
        let contaminants = this.controller.getContaminantList();
        let recursionCallBack = (row, col, contaminants) => {
            if (contaminants.length === 0) {
                this.controller.resetCurrentContaminant();
                return;
            }
            let head = contaminants[0], tail = contaminants.slice(1);
            this.controller.setCurrentContaminant(head);
            let transform = `translate(${View.smallHistogramWidth * col}, ${View.smallHistogramHeight * row}) scale(${View.smallHistogramZoomingFactor})`;
            let smallHistogram = new SmallHistogram(this.svg, this.controller, transform, this.selectContaminant);
            this.smallMultipleHistograms.push(smallHistogram);
            let newCol = col + 1;
            if (newCol === 5) {
                newCol = 0;
                row++;
            }
            this.controller.setUpPoints((points) => {
                smallHistogram.callbackDrawHistogram(points);
                recursionCallBack(row, newCol, tail)
            });
        };
        recursionCallBack(0, 0, contaminants);
    }


    callbackDrawBigHistogram(points) {
        this.bigHistogram.callbackDrawHistogram(points);
    }

    bigHistogramBoundToMap(eraseCallback, setUpPointsCallback) {
        this.bigHistogram.boundToMap(eraseCallback, setUpPointsCallback);
    }

    eraseSmallMultipleHistograms() {
        for (let i = 0; i < this.smallMultipleHistograms.length; i++) {
            this.smallMultipleHistograms[i].erase();
        }
        this.smallMultipleHistograms = [];
    }

    eraseBigHistograms(){
        this.bigHistogram.erase()
    }

}