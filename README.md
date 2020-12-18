# Object-Detection and Dexter

As part of our M.S.C.S program at UCLA, we developed Dexter: a novel, and fast search engine dedicated for video.

Dexter is powered off of YOLOv4 and DeepSORT to label + track objects from video. It is then built atop Elasticsearch in order to enable fast queries over videos via a web interface.

Please direct any questions related to the project to akuroodi@ucla.edu, and feel free to use the code for your own prototyping! 

#########################################

Additionally contains a few different Python programs to detect objects in both images and video files using the YOLOv3 object detector

Image detector off of the following tutorial: https://www.thepythoncode.com/article/yolo-object-detection-with-opencv-and-pytorch-in-python
Video detection can be found on Colab: https://colab.research.google.com/drive/1zmeSTP3J5zu2d5fHgsQC06DyYEYJFXq1?usp=sharing

Modifications/Extensions:
- Sequentially performs detection on all images in a user-specified "/images" folder in the project directory
- Comments explaining YOLOv3 architecture in more detail (convolutional layers, outptut layers, non-maxima supression, etc.)
- Places all labeled images into a separate "DetectedImages" folder in the project directory 

PLEASE NOTE: 
The weights file used to train YOLO is too large to upload to GitHub, please download it here:
https://pjreddie.com/media/files/yolov3.weights
