# How to Launch This
A simple python server is used here.
1. make sure you have python3  
**Linux and macOS:** to check the version type `python --version`<sup>[1](#myfootnote1)</sup> in your terminal  
**Windows** press `windows + r` and type `cmd` to open your terminal, and then type `python --version`  
**If the terminal shows something like `Python 3.x.x`, ignore the step 2**  

2. If you do not see `Python 3.x.x`, download [Python3](https://www.python.org/), and follow the instruction to install it.  

3. Now open your terminal and move to current directory to *GardenRootsWeb/build*  
You can do it by typing `cd` followed by the path of the directory.  

4. Now type `python -m http.server 8982`<sup>[2](#myfootnote2)</sup>
  Now, you should see:`Serving HTTP on 0.0.0.0 port 8982 (http://0.0.0.0:8982/) ...`  
  And, you can go to `http://0.0.0.0:8982/` to see the website.

5. Shut down the server
 press `ctrl+c` in the same terminal.

------------------------------------------------------------
<a name="myfootnote1">1</a>: could be `python3 --version`  
<a name="myfootnote2">2</a>: could be `python3 -m http.server 8982`  
--------------------------------------------------------------
# Functionality of Each Module
This visualization has 3 parts: **controller**, **model**, and **view**.  
## controller
**Controller.js** contains the controller class. A instance of controller manages how view can interact with 
model.     
Things to know:  
1. the 1st parameter of _setUpBackGroundMap_ and _setUpPoints_ is a one-parameter callback function. 
2. call _setCurrentDataSet_ and _setCurrentContaminant_ before calling _setUpPoints_
3. _setCurrentCounty_ is optional.
4. the 2nd parameter of _setUpPoints_ is a filter function, whose type is defined by JsDoc called _filterPoints_ in **Histogram.js**
  
## model
There are 7 files under the model directory.
1. **APIReader.js** contains the code that interacts with API. There are several functions defined in the class. Other classes
can just call them to get data from API. Currently, _APIReader_ is not used in the visualization.
In the future, the visualization should use data from _APIReader_ instead of data from local file. 

2. **BackGroundMap.js** contains the code that loads the map of Arizona. The file should be in topojson format. Other classes can 
just call _setUp_ function with a county and a callback. The callback function will be called with the map data.

3. **ColorScales.js** contains the code that calculates the color scales. Other classes can just call its _calculateColor_ 
function to get correct color.

4. **DataPoints.js** represents a circle/point in the map. _getData_ is the function that should be called from other files. 
It will return a js object (or someone calls it dictionary) that contains info needed by the visualization. 

5. **DataSet.js** represents a data set. It manages _DataPoints_. Most of its functions are used in **Controller.js**

6. **Model.js** just contains most hard code values. They are either file paths or enumerated variables. 
It also keeps records of current data set, contaminant, and county. Call functions in this class to get instances of other model classes.

7. **SizeScales.js** contains code that calculate size.  

Things to know:   
Overall, each circle of the visualization is represented by a instance of _DataPoint_. All circles are managed by _DataSet_. 
_ColorScales_ and _SizeScales_ provides methods that convert data to values that view can use. _Model_ is like a factory class. 
All other classes in model should be indirectly constructed by calling methods in **Model.js** to avoid unexpected behavior 
caused by constructing multiple times.  

## view 
There are 9 files in view.  

**View.js** is the top class that organizes other classes in view. 
- static methods:
    - _selectDataSet_, _selectContaminant_, and _selectCounty_ are called when user selects corresponding variables
    - call _launch_ to start this visualization.
- instance methods 
    - _selectDataSet_, _selectContaminant_, and _selectCounty_ are the instance version called by their corresponding static methods.
        the reason of doing this is to make sure there is only one instance of view (and this is how JavaFx did).
    - _erasePreviousDrawing_ will erase the visualization. 
    - _drawDataPointsAndLegends_ will draw the visualization 
    - _setUpWhiteColorLegend_ is called after the visualization launches and before user selects a data set and a contamination.
    - _setUpBackGroundMap_ sets up back ground map
    - _setUpSvg_ sets up SVG and relevant zooming functions.

**Histogram.js**, **SmallHistogram.js**, and **HistogramGroup.js** are classes dealing with histograms. 
**Histogram.js** draws the big histogram when user selects a data set and a contamination. 
**SmallHistogram.js** extends **Histogram.js** and is managed by **HistogramGroup.js** to show small multiple histograms 
when user only select a data set. 


BackGround.js
ColorLegend.js
DataPointPrompt.js
Points.js
SizeLegend.js

         
        







## index.html   
**index.html** is the page for the visualization. _View.lunch()_ should be called after the website is loaded.

## test.html  
This is a proof-of-concept web page. It contains the code to deal with tract and census blocks. In the future, the visualization 
should be able to color these blocks by contamination level. 

## JsDoc
There are many types and function signatures defined in JsDoc. Make sure to read them before modifying the code 
and revise them after modifying relevant code. 