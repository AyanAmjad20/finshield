from ultralytics import YOLO

model = YOLO('best.pt')

# process all videos in videos/ (any .mp4, .avi, .mov, etc.)
results = model.predict(
    source='videos',    # folder of videos
    conf=0.25,          # only show detections ≥25% confidence
    save=True,          # save annotated videos
    save_txt=False      # (optional) don’t save per-frame .txt files
)
