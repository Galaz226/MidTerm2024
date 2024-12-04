require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/auth.js');
const postRoutes = require('./src/routes/posts.js');

const app = express();


app.use(express.json());


app.use('/', authRoutes);
app.use('/', postRoutes);


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Đã kết nối MongoDB'))
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});