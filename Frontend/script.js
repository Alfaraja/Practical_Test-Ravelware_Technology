const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const resultDiv = document.getElementById("result");
const captureBtn = document.getElementById("capture");


navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => console.error("Camera error:", err));


async function detectFrame() {

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);


  const base64Image = canvas.toDataURL("image/jpeg");

  try {
    const response = await fetch("http://127.0.0.1:5000/detect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64Image })
    });

    const data = await response.json();
    console.log("API Response:", data);


    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (data.detections && data.detections.length > 0) {
      resultDiv.innerHTML = ""; // reset
      data.detections.forEach(det => {
        const [x, y, w, h] = det.box;


        ctx.strokeStyle = det.color === "Red" ? "red" : "yellow";
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, w, h);


        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText(`${det.color} ${det.shape}`, x, y > 20 ? y - 5 : y + 20);

        
        const p = document.createElement("p");
        p.textContent = `Color: ${det.color}, Shape: ${det.shape}`;
        resultDiv.appendChild(p);
      });
    } else {
      resultDiv.innerHTML = "<p>No detection</p>";
    }

  } catch (err) {
    console.error("Detection error:", err);
  }
}


captureBtn.addEventListener("click", detectFrame);
