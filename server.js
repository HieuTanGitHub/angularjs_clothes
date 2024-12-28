const jsonServer = require("json-server");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const express = require("express");

const app = express();
const PORT = 3000;

// Cấu hình multer để lưu file vào thư mục assets/img
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "assets/img")); // Thư mục lưu trữ
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Tên file duy nhất
  },
});
const upload = multer({ storage });

app.post("/upload-image", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  const filePath = `/assets/img/${req.file.filename}`; // Đường dẫn file
  res.status(200).json({ imageUrl: filePath }); // Trả về đường dẫn file
});
// Dùng các middlewares mặc định của JSON Server
server.use(middlewares);

// Sử dụng router JSON Server để làm API REST
server.use(router);

// Bắt lỗi và xử lý
server.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Cấu hình đường dẫn cho static file (để JSON Server có thể truy cập ảnh)
// server.use('/assets', jsonServer.static(path.join(__dirname, 'assets')));

// API endpoint để tải ảnh lên
// server.post('/upload', upload.single('file'), (req, res) => {
//   const file = req.file;
//   if (!file) {
//     return res.status(400).send('No file uploaded');
//   }
//   const imageUrl = `/assets/img/${file.filename}`;
//   res.status(200).json({ imageUrl });
// });

// Chạy server
server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});
