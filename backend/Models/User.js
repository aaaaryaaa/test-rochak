// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    prolificId: {
        type: String,
        required: true,
        unique: true // Ensure each ID is unique
    },
    startTime: {
        type: Date,
        default: Date.now // Automatically set to the current date/time
    },
    endTime: {
        type: Date,
        default: Date.now // This can be updated later
    },
    page: {
        type: 1,
        default:0
    },
    selectedOptions: {
        type: [String],
        default: [] // Array to store selected options
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
