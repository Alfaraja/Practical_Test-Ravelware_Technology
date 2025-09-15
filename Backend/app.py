from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2, numpy as np
import base64

app = Flask(__name__)
CORS(app)

def detect_color_shape(image):
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    results = []

    lower_red1 = np.array([0, 100, 50])
    upper_red1 = np.array([10, 255, 255])
    mask1 = cv2.inRange(hsv, lower_red1, upper_red1)

    lower_red2 = np.array([170, 100, 50])
    upper_red2 = np.array([180, 255, 255])
    mask2 = cv2.inRange(hsv, lower_red2, upper_red2)

    mask_red = mask1 + mask2
    results += find_shapes(mask_red, "Red")

    lower_yellow = np.array([10, 20, 20])
    upper_yellow = np.array([45, 255, 255])
    mask_yellow = cv2.inRange(hsv, lower_yellow, upper_yellow)
    results += find_shapes(mask_yellow, "Yellow")

    return results


def find_shapes(mask, color_name):
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    found = []
    for cnt in contours:
        area = cv2.contourArea(cnt)
        if area > 150:
            approx = cv2.approxPolyDP(cnt, 0.04 * cv2.arcLength(cnt, True), True)
            x, y, w, h = cv2.boundingRect(cnt)
            shape = "Unknown"
            if len(approx) == 3:
                shape = "Triangle"
            elif len(approx) == 4:
                shape = "Rectangle"
            elif len(approx) > 6:
                shape = "Circle"
            found.append({
                "color": color_name,
                "shape": shape,
                "box": [int(x), int(y), int(w), int(h)]
            })
    return found


@app.route("/detect", methods=["POST"])
def detect():
    data = request.json
    print("Request keys:", list(data.keys()))
    img_b64 = data.get('image', '')
    print("Base64 length:", len(img_b64))

    if not img_b64:
        return jsonify({"error": "No image data received"}), 400

    img_data = base64.b64decode(img_b64.split(',')[1])
    img_array = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

    detections = detect_color_shape(img)
    print("Detections:", detections)  
    return jsonify({"detections": detections})


if __name__ == "__main__":
    
    app.run(host="0.0.0.0", port=5000, debug=True)
