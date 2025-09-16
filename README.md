## Colour & Shape Detection

Proyek ini merupakan sistem **deteksi warna dan bentuk secara real-time** yang dijalankan melalui web.  
Backend dibangun menggunakan **Flask (Python)** dan **OpenCV** untuk pemrosesan gambar, sedangkan frontend menggunakan **HTML, CSS, dan JavaScript** untuk menampilkan video kamera dan mengirim data ke server.

---

## Deskripsi
Aplikasi ini dapat mendeteksi **warna (merah dan kuning)** dan **bentuk dasar** (segitiga, persegi/rectangle, dan lingkaran) dari objek yang tertangkap kamera laptop atau webcam.  
Frontend akan menampilkan hasil deteksi (warna, bentuk, dan koordinat bounding box) secara real-time melalui browser.

---

## Fitur Utama
- Deteksi **warna merah** dan **kuning** (termasuk kuning cerah dan gelap).
- Deteksi **bentuk**: segitiga, persegi/rectangle, dan lingkaran.
- Realtime menggunakan **kamera laptop/webcam**.
- Antarmuka web sederhana dan mudah digunakan.

---

## Persyaratan
- **Python 3.8+**
- **VS Code** (disarankan)
- Browser modern (Chrome/Edge/Firefox)

---

## Instalasi

1. **Clone / Download Proyek**
   ```bash
   git clone https://github.com/username/colour-shape-detection.git
   cd colour-shape-detection

## How To Run 
**Jalankan server Flask:**

python app.py

**Buka browser dan akses:**

http://127.0.0.1:5000

Webcam akan aktif dan mendeteksi warna & bentuk secara real-time.

## How the Code Works

- Capture Video: Mengambil frame dari webcam menggunakan OpenCV.
- Color Detection:
Convert frame ke HSV.
Buat mask untuk warna merah dan kuning.
- Shape Detection:
Temukan kontur objek pada mask warna.
Tentukan bentuk berdasarkan jumlah sisi kontur (triangle, rectangle, circle).
- Display:
Gambarkan bounding box dan label warna + bentuk pada frame.
Tampilkan frame ke browser via Flask streaming.

## Screenshot 
![Hasil Deteksi](screenshot.png)