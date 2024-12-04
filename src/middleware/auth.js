const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const apiKey = req.query.apiKey;
    
    if (!apiKey) {
      return res.status(401).json({ message: 'Không có apiKey' });
    }

    const decoded = jwt.verify(apiKey, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'apiKey không hợp lệ' });
  }
};

module.exports = auth;