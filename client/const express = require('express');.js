const express = require('express');
const router = express.Router();
const verifyJWT = require('../middlewares/verifyJWT');
const requireRole = require('../middlewares/requireRole');
// assume Application model is imported earlier

// GET /applications/manage?sort=appliedDate|-appliedDate|deadline|-deadline&status=...
router.get('/manage', verifyJWT, requireRole('moderator','admin'), async (req, res) => {
  const { sort, status } = req.query;
  const filter = {};
  if (status) filter.status = status;
  const sortMap = {
    appliedDate: { createdAt: 1 },
    '-appliedDate': { createdAt: -1 },
    deadline: { 'scholarship.deadline': 1 },
    '-deadline': { 'scholarship.deadline': -1 }
  };
  try {
    const list = await Application.find(filter)
      .populate('user')
      .populate('scholarship')
      .sort(sortMap[sort] || { createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
});

module.exports = router;