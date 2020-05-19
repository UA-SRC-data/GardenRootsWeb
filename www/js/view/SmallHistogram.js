class SmallHistogram extends Histogram {

    contaminant;
    cover;
    greyBackGround;
    text;
    selectContaminant;

    /**
     * This is the constructor
     * @param {D3Selection} svg - the main svg dom
     * @param {Controller} controller - a instance of controller object
     * @param {string} translate
     */
    constructor(svg, controller, translate, selectContaminant) {
        super(svg, controller);
        this.layer.attr("transform", translate);
        this.contaminant = this.controller.getCurrentContaminant();
        this.selectContaminant = selectContaminant;
        this.layer.on("mouseenter", ()=>{
            this.showContaminantName();





        });

        this.layer.on("mouseleave", ()=>{
            this.removeContaminantName();
        })
    }


    /**
     * Add the name of contaminant when user's mouse over the histogram
     */
    showContaminantName = () => {
        this.greyBackGround = this.layer.append("rect");
        this.greyBackGround
            .attr("x", 0)
            .attr("y", 70)
            .attr("height", "50vh")
            .attr("width", "58%")
            .style("opacity", 0)
            .transition().duration(800)
            .attr("fill", "grey")
            .style("opacity", 0.8);
        this.text = this.layer.append("text");
        this.text
            .attr("x", 170)
            .attr("y", 350)
            .style("font-size", 60)
            .style("text-anchor", "middle")
            .text(() => {
                return this.contaminant;
            });
        this.cover = this.layer.append("rect");
        this.cover
            .attr("x", 0)
            .attr("y", 70)
            .attr("height", "50vh")
            .attr("width", "58%")
            .style("opacity", 0)
            .style("cursor", "pointer")
            .on("click", ()=>this.selectContaminant(this.contaminant));

    };

    /**
     * remove the name
     */
    removeContaminantName = () => {
        this.greyBackGround.remove();
        this.cover.remove();
        this.text.remove();
    };


    /**
     * This class does not support this operation. but it is defined in Histogram
     */
    boundToMap = (eraseCallback, setUpPointsCallback) =>{
        //todo throw error
    };

    /**
     * This class does not support this operation. but it is defined in Histogram
     */
    unBoundToMap=() => {
        //todo throw error
    };

    /**
     * This class does not support this operation. but it is defined in Histogram
     */
    updatePoints = (eraseCallback, setUpPointsCallback, filter) => {
        //todo throw error
    };

    /**
     * This class does not support this operation. but it is defined in Histogram
     */
    updateSelectedRect = () => {
        //todo throw error
    };

    /**
     * This class does not support this operation. but it is defined in Histogram
     */
    isSelected = () => {
        //todo throw error
    };
}