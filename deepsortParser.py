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

labels = open(fooPath, "r")
textList = [line.strip() for line in labels.readlines() if "FPS" not in line]
textList.pop()      # last output line from DeepSort doesn't contain relevant info

frames = []
frame = {}

# Modify tracked object lines to include average bounding box coordinates only
for line in textList:
    if 'Frame' in line: 
        if len(frame) > 0 and len(frame['objects']) > 0:
            frames.append(frame)
        frame = {}
        pair = line.split(':')
        frame['frame'] = int(pair[1])
        frame['objects'] = []
        continue
    
    # Get items in line
    items = line.split(',')
    classPair = items[1].split(':')
    # Get integer in line
    ints = [int(s) for s in (re.findall(r'\d+', line))]
    # Save to obj dict
    obj = {}
    obj['trackerID'] = ints[0]
    obj['xmin'] = ints[1]
    obj['ymin'] = ints[2]
    obj['xmax'] = ints[3]
    obj['ymax'] = ints[4]
    obj['class'] = classPair[1].strip()
    # Append obj to frame
    frame['objects'].append(obj)

# Append frame to frames
frames.append(frame)

# Write json into a file
with open('output_json.txt', 'w') as outfile:
    json.dump(frames, outfile)








