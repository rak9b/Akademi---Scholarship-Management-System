const express = require('express');
const router = express.Router();
// assume Scholarships model is imported earlier in file

router.get('/', async (req, res) => {
  const { search, sort, page = 1, limit = 9 } = req.query;
  const q = {};
  if (search) {
    const re = new RegExp(search, 'i');
    q.$or = [{ name: re }, { university: re }, { degree: re }];
  }
  const sortSpec = sort
    ? { [sort.replace('-', '')]: sort.startsWith('-') ? -1 : 1 }
    : { createdAt: -1 };
  const skip = (parseInt(page) - 1) * parseInt(limit);
  try {
    const [data, total] = await Promise.all([
      Scholarships.find(q).sort(sortSpec).skip(skip).limit(parseInt(limit)),
      Scholarships.countDocuments(q)
    ]);
    res.json({ total, page: Number(page), limit: Number(limit), data });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch scholarships' });
  }
});

router.get('/applications', verifyJWT, requireRole('moderator', 'admin'), async (req, res) => {
  const { status, sort, page = 1, limit = 10 } = req.query;
  const query = status ? { status } : {};
  const sortBy = sort || '-applicationDate';
  
  try {
    const applications = await Application
      .find(query)
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('scholarshipId');
    
    const total = await Application.countDocuments(query);
    res.json({
      applications,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;