const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['user', 'moderator', 'admin'],
        default: 'user',
    },
    photoURL: {
        type: String,
    },
    uid: {
        type: String,
        required: true,
        unique: true,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
