from ultralytics import YOLO
import cv2
import os

# 1. Load model
model = YOLO("best.pt")

# Directories
input_dir   = "videos"
video_out   = "videos_out"
image_out   = "images_out"
os.makedirs(video_out, exist_ok=True)
os.makedirs(image_out, exist_ok=True)

# Supported extensions
VIDEO_EXTS = (".mp4", ".avi", ".mov", ".mkv")
IMG_EXTS   = (".jpg", ".jpeg", ".png", ".bmp")

# 2. Loop over every file in input_dir
for fname in os.listdir(input_dir):
    lower = fname.lower()
    in_path = os.path.join(input_dir, fname)

    # --- VIDEOS ---
    if lower.endswith(VIDEO_EXTS):
        cap = cv2.VideoCapture(in_path)
        if not cap.isOpened():
            print(f"[!] Couldn’t open video {fname}, skipping.")
            continue

        fps    = cap.get(cv2.CAP_PROP_FPS)
        w      = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        h      = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fourcc = cv2.VideoWriter_fourcc(*"mp4v")
        out_p  = os.path.join(video_out, f"out_{fname}")
        out    = cv2.VideoWriter(out_p, fourcc, fps, (w, h))

        print(f"Processing video {fname} → {out_p}")
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            res       = model(frame)[0]
            annotated = res.plot()
            out.write(annotated)

        cap.release()
        out.release()

    # --- IMAGES ---
    elif lower.endswith(IMG_EXTS):
        img = cv2.imread(in_path)
        if img is None:
            print(f"[!] Failed to load image {fname}, skipping.")
            continue

        res       = model(img)[0]
        annotated = res.plot()
        out_p     = os.path.join(image_out, f"out_{fname}")
        cv2.imwrite(out_p, annotated)
        print(f"Processed image {fname} → {out_p}")

    else:
        # skip any other files
        continue

print("✅ Done processing all videos and images in 'test/'")
