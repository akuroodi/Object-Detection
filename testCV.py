import cv2 as cv



cap = cv.VideoCapture("JHT.mp4")
# Define the codec and create VideoWriter object
fourcc = cv.VideoWriter_fourcc(*'MP4V')
x = int(cap.get(3))
y = int(cap.get(4))
out = cv.VideoWriter('output.mp4', fourcc, 30.0, (x,  y))
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        print("Can't receive frame (stream end?). Exiting ...")
        break
    frame = cv.flip(frame, 0)
    # write the flipped frame
    out.write(frame)
    cv.imshow('frame', frame)
    if cv.waitKey(1) == ord('q'):
        break


# Release everything if job is finished
cap.release()
out.release()
cv.destroyAllWindows()