"""
Input: Text files containing output from DeepSort object tracking on various video sets
NOTE: all input .txt files must be kept in same directory as this program

Outputs: JSON formatted arrays containing:
- Frame number, frmnum (int) 
- Tracked object ID, tID (int)
- Object class, class (string)
- Object coordinates, (x,y) (tuple)

"""

import os
import json
import re           

cwd = os.getcwd() + "/"
fooPath = cwd + "foo.txt"

textList = []           # raw input file that is outputted from DeepSort on YOLOv4
tracked = []            # to store proccesed file
labels = open(fooPath, "r")
textList = [line.strip() for line in labels.readlines() if "FPS" not in line]
textList.pop()      # last output line from DeepSort doesn't contain relevant info

# Skip over and remove the first few frames/lines that don't track any objects
for line in textList[:]:
    if 'Tracker' in line: 
        break
    textList.remove(line) 

# Modify tracked object lines to include average bounding box coordinates only
for line in textList[:]:
    if 'Frame' in line: 
        tracked.append(line)
        continue

    # Grab the min/max bbox coordinates and replace them with averages
    coords = [int(s) for s in (re.findall(r'\d+', line))]
    coords = coords[1:]
    (x, y) = (coords[0] + coords[2]) / 2.0 , (coords[1] + coords[3]) / 2.0

    # Reconstruct tracked object list with new average coordinates per object
    entry = line.split(',')[:2]
    location = "Coordinates: " + str( (x,y) )
    entry.append(location)
    tracked.append(entry)










