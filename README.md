This is still under development.
-----------------------------------------------
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
