import cv2
import os

VIDEO_EXTS = {".mp4", ".avi", ".mov", ".mkv"}

def extract_frames(video_path, output_dir, prefix="frame"):
    os.makedirs(output_dir, exist_ok=True)
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"[!] Couldn’t open {video_path}, skipping.")
        return
    count = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        count += 1
        fname = f"{prefix}_{count:06d}.jpg"
        cv2.imwrite(os.path.join(output_dir, fname), frame)
    cap.release()
    print(f"→ {count} frames from '{os.path.basename(video_path)}' saved to '{output_dir}'")

def batch_extract(videos_dir="videos2", frames_base="frames"):
    for fname in os.listdir(videos_dir):
        name, ext = os.path.splitext(fname)
        if ext.lower() in VIDEO_EXTS:
            vid_path = os.path.join(videos_dir, fname)
            out_dir = os.path.join(frames_base, name)
            extract_frames(vid_path, out_dir, prefix=name)

if __name__ == "__main__":
    # point these at your actual directories, if different
    videos_dir = "videos2"
    frames_base = "frames"
    batch_extract(videos_dir, frames_base)
