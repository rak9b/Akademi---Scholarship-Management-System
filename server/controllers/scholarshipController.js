const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Mongoose Schema for Scholarships
const scholarshipSchema = new mongoose.Schema({
  scholarshipName: { type: String, required: true },
  universityName: { type: String, required: true },
  universityCity: { type: String, required: true },
  universityCountry: { type: String, required: true },
  universityWorldRank: { type: Number, required: true },
  subjectCategory: { type: String, required: true },
  scholarshipCategory: { type: String, required: true },
  degree: { type: String, required: true },
  tuitionFees: { type: Number, required: true },
  applicationFees: { type: Number, required: true },
  serviceCharge: { type: Number, required: true },
  applicationDeadline: { type: Date, required: true },
  scholarshipPostDate: { type: String, required: true },
  postedUserEmail: { type: String, required: true },
  universityImage: { type: String, required: true }, // URL from ImgBB
  description: { type: String, required: true }
});

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

// Controller for POST /api/scholarships
exports.createScholarship = async (req, res) => {
  try {
    // Assuming JWT middleware has verified the user and role
    // The frontend handles ImgBB upload and sends universityImage URL in req.body

    const newScholarship = new Scholarship(req.body);

    await newScholarship.save();
    res.status(201).json(newScholarship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Explanation of the issue and fix:
// The TypeError occurred because the code tried to access 'image' on req.file, which was undefined (no file uploaded to backend).
// Fix: Removed file handling in backend as frontend now uploads to ImgBB and sends the URL in req.body. Added required: true to universityImage in schema.