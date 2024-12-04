const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');
const auth = require('../middleware/auth.js');

// Tạo post mới
router.post('/posts', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.userId;

    const post = new Post({
      userId,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật post
router.put('/posts/:id', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài post' });
    }

    if (post.userId !== req.user.userId) {
      return res.status(403).json({ message: 'Không có quyền cập nhật' });
    }

    post.content = content;
    post.updatedAt = new Date();
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;