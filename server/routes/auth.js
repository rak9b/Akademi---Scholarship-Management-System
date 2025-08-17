const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model

// Generate JWT
router.post('/jwt', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            // If user not found, create a new user
            const newUser = new User({
                email,
                // You might want to add more fields here from req.body if available
                // For example, name, photoURL, uid from firebase
                name: req.body.name || 'No Name',
                uid: req.body.uid,
                role: 'user' // default role
            });
            await newUser.save();
            const token = jwt.sign({
                email: newUser.email,
                role: newUser.role,
                name: newUser.name
            }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.send({ token });
        }
        const token = jwt.sign({
            email: user.email,
            role: user.role,
            name: user.name
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(500).send({ message: 'Failed to generate token' });
    }
});

module.exports = router;
