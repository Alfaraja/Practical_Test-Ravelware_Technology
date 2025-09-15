const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const resultDiv = document.getElementById('result');
const captureBtn = document.getElementById('capture');

navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => { video.srcObject = stream; })
.catch(err => console.error("Camera error:", err));

captureBtn.addEventListener('click', async () => {
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/jpeg');

  const response = await fetch('http://localhost:5000/detect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: dataUrl })
  });
  const data = await response.json();

  resultDiv.innerHTML = "";
  if (data.detections.length === 0) {
    resultDiv.textContent = "No objects detected";
  } else {
    data.detections.forEach(d => {
      resultDiv.innerHTML += `<p>Color: <b>${d.color}</b> | Shape: <b>${d.shape}</b></p>`;
    });
  }
});
