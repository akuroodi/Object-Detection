# Pilot program to get familiar with using the YOLO object detector on a set of images

import time
import sys
import os
import cv2
import numpy as np


# Define system wide variables for the object detection pipeline

CONFIDENCE = 0.5
SCORE_THRESHOLD = 0.5
IOU = 0.5

# Setup paths for the files needed to startup YOLO model (config and weights)
# label_path houses all of the class labels YOLO detects, comes from the COCO dataset
cwd = os.getcwd() + "/"
config_path = cwd + "yolov3.cfg"
weights_path = cwd + "yolov3.weights"
label_path = cwd + "coco.names"

# Try making a new folder to hold detected images
try:    
    outputImages = os.mkdir(cwd+"DetectedImages")
except FileExistsError:
    while True:
        x = input("Output image folder already exists, overwrite existing contents[Y/N]? ")
        x = x.upper()
        if x == "N": exit(1)
        elif x == "Y":
            print("Proceding...")
            break
        else: continue

# Each line of file "coco.names" contains a class label, so split it out and store in labels list
classes = []
labels = open(label_path, "r")
classes = [line.strip() for line in labels.readlines()]

# Setup the colors that will later be used for drawing bounding boxes (BB) around objects
# Each color represented via 3-element array containing BGR pixel values
colors = np.random.randint(0, 255, size=(len(classes), 3), dtype="uint8")

# Load the NN
net = cv2.dnn.readNetFromDarknet(config_path, weights_path)

# Loop through all pictures in the "images" folder and scan them for objects
imageDir = cwd+"images/"
for pic in os.scandir(imageDir):
    pic = pic.path
    image = cv2.imread(pic)
    file_name = os.path.basename(pic)
    filename, ext = file_name.split(".")


    h = image.shape[0]
    w = image.shape[1]
    # Need 4D blob to feed into CNN, first normalize pixel intensities and resize to 416x416
    # Note we swap RB since OpenCV defaults to BGR, and .jpg follows RGB
    blob = cv2.dnn.blobFromImage(image, 1/255.0, (416, 416), swapRB=True, crop=False)

    # Feed blob into NN
    net.setInput(blob)

    # Gets list of all 106 layers used in YOLOv3
    # NOTE: YOLOv3 has 3 output layers (82, 94 ,106)
    layers = net.getLayerNames()
    
    # getUnconnectedOutLayers() returns indices for detection layers as a list of lists
    # Use those to index into full list of layers and extract output layers
    Outputlayers = [ layers[ x[0]-1 ] for x in net.getUnconnectedOutLayers() ]

    # Compute 1 forward pass through DNN, and record output from each detection layer
    # YOLOv3 detects on layers 79-82, 91-94, 103-106
    Detectionlayers = net.forward(Outputlayers)


    boxes, confidences, class_ids = [], [], []

    # Loop over each detected object in the detection layers
    # NOTE: YOLOv3 detects ~10.5K objects in total! 
    # Class label is determined with class_id index into the COCO list of classes that is 80 items long
    for layer in Detectionlayers:
        for detctedObject in layer:
            # Each detected object is represented with a vector of length 85 (since COCO has 80 classes)
            # First 4 records are object coordinates (x,y,bbox width, bbox height)
            # Rest of records represent class labels, with a confidence assigned to each class
            scores = detctedObject[5:]    
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            
            # Record locations of BBs around objects that meet our confidence threshold (50%)
            if confidence > CONFIDENCE:
                box = detctedObject[:4] * np.array([w, h, w, h])
                (centerX, centerY, width, height) = box.astype("int")

                # Get coordinates of the top left corner of bounding box
                x = int(centerX - (width / 2))
                y = int(centerY - (height / 2))

                # Add object bounding box, identified class and its confidence to our lists
                boxes.append([x, y, int(width), int(height)])
                confidences.append(float(confidence))
                class_ids.append(class_id)
            

    # Non-maxima supression to limit 1 bounding box per detected object
    # Returns list of indicies for the optimum boxes, flatten the ndarray for easier looping
    boxIndicies = cv2.dnn.NMSBoxes(boxes, confidences, SCORE_THRESHOLD, IOU)
    boxIndicies = boxIndicies.flatten()


    # Draw actual bounding boxes and text labels for each detected object 
    for i in boxIndicies:
        cornerX, cornerY = boxes[i][:2]
        width, height = boxes[i][2:]
        color = [int(c) for c in colors[class_ids[i]]]
        cv2.rectangle(image, (cornerX,cornerY), (cornerX+width, cornerY+height), color=color, thickness=3)
        text = "Class: " + str(classes[class_ids[i]])
        
        # Get size of our text string, and position text box slightly above top left corner of bounding box
        (text_width, text_height) = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, thickness=1)[0]
        text_offset_x = cornerX
        text_offset_y = cornerY - 5
        tbox_coords = ((text_offset_x, text_offset_y), (text_offset_x + text_width + 2, text_offset_y - text_height))
        
        # Place text above bounding box, draw text box around it
        cv2.rectangle(image, tbox_coords[0], tbox_coords[1], color=color, thickness=cv2.FILLED)
        cv2.putText(image, text, (cornerX, cornerY - 5), cv2.FONT_HERSHEY_SIMPLEX,fontScale=1, color=(0,0,0), thickness=1)

        cv2.imwrite(cwd+"DetectedImages/"+ file_name + "_yolo3." + ext, image)


