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
This visualization has 3 parts: controller, model, and view.
##controller
Controller.js contains the controller class. A instance of controller manages how view can interact with 
model. It will 

##model
There are 7 files under the model directory.
1. APIReader.js contains the code that interacts with API. There are several functions defined in the class. Other classes
can just call them to get data from API. Currently, APIReader is not used in the visualization.
In the future, the visualization should use data from APIReader instead of data from local file. 

2. BackGroundMap.js contains the code that loads the map of Arizona. The file should be in topojson format. Other classes can 
just call setUp function with a county and a callback. The callback function will be called with the map data.

3. ColorScales.js contains the code that calculates the color scales. Other classes can just call its calculateColor 
function to get correct color.

4. DataPoints.js represents a circle/point in the map. getData is the function that should be called from other files. 
It will return a js object (or someone calls it dictionary) that contains info needed by the visualization. 

5. DataSet.js represents a data set. It manages DataPoints. Most of its functions are used in Controller.js

6. Model.js just contains most hard code values. They are either file paths or enumerated variables. 
It also keeps records of current data set, contaminant, and county. Call functions in this class to get instances of other model classes.

7. SizeScales.js contains code that calculate size.
##view 

##index.html 


.
##test.html