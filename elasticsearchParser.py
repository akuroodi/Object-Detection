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
import sys

# parse the input file
inputFile = open(sys.argv[1], "r")
lines = [line.strip() for line in inputFile.readlines() if "Frame #" in line or "Tracker ID" in line]

frames = []
for line in lines:
    # new frame
    if line.startswith("Frame"):
        frames.append({"frame" : str(line[line.rindex(' ')+1:]), "objects" : []})

    # more objects from previous frame
    else:
        # Get items in line
        items = line.split(',')
        classPair = items[1].split(':')
        # Get integer in line
        ints = [int(s) for s in (re.findall(r'\d+', line))]
        # Get average coordinates
        (x, y) = (ints[1] + ints[3]) / 2.0 , (ints[2] + ints[4]) / 2.0
        # Get the confidence score
        confidence = float(items[-1][items[-1].rindex(' ')+1:])
        # Save to objects list
        obj = {}
        obj["trackerID"] = ints[0]
        obj["class"] = classPair[1].strip()
        obj["xmin"] = ints[1]
        obj["ymin"] = ints[2]
        obj["xmax"] = ints[3]
        obj["ymax"] = ints[4]
        obj["x"] = x
        obj["y"] = y
        obj["confidence"] = confidence
        # Append obj to frame
        frames[-1]["objects"].append(obj)

# open file to write
outputFile = open("elasticsearchInput/elasticsearch_bulk_" + sys.argv[1].lower(), "w")

for frame in frames:
    # write new index to file
    indexLine = {"index" : { "_id" : frame["frame"]}}
    outputFile.write(json.dumps(indexLine) + "\n")

    # write frame dict to file
    outputFile.write(json.dumps(frame) + "\n")
