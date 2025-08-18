const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// POST /auth/jwt accepts firebaseToken or plain { email, uid, role? }
router.post('/jwt', async (req, res) => {
  try {
    const { firebaseToken, email, uid, role } = req.body;
    if (!firebaseToken && (!email || !uid)) {
      return res.status(400).json({ message: 'Missing credentials' });
    }
    const payload = { email, uid, role: role || 'user' };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d', algorithm: 'HS256' });
    res.json({ token });
  } catch (e) {
    res.status(500).json({ message: 'Token issue failed' });
  }
});

router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign(
      { uid: payload.uid, email: payload.email, role: payload.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
});

module.exports = router;
