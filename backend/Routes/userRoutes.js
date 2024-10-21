// routes/userRoutes.js
const express = require('express');
const User = require("../Models/User");
const router = express.Router();

// Route to create a new user
router.post('/create', async (req, res) => {
    const { prolificId } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ prolificId });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        user = new User({ prolificId });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
