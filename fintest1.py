from ultralytics import YOLO
import cv2

# 1. Load model
model = YOLO("model.pt")

# 2. Open video
cap = cv2.VideoCapture("fintest1.mov")
out  = cv2.VideoWriter("out.mov",
                       cv2.VideoWriter_fourcc(*"mov"),
                       cap.get(cv2.CAP_PROP_FPS),
                       (int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)),
                        int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))))

# 3. Process frames
while True:
    ret, frame = cap.read()
    if not ret:
        break
    results   = model(frame)[0]
    annotated = results.plot()
    out.write(annotated)

cap.release()
out.release()
