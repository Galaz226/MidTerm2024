const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');


router.post('/users/register', async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new User({
      userName,
      email,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email không tồn tại' });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password không đúng' });
    }

    
    const apiKey = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    res.json({ apiKey });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;