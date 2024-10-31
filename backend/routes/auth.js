const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const { authenticate, isAdmin } = require('../middleware/authMiddleware.js');

router.post('/signup', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const user = new User({ username, password, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(400).json({ error: 'User registration failed' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.secret_key, { expiresIn: '1h' });
        res.json({ token , userInfo :  { username : user?.username  , role : user?.role } });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

router.get('/users', authenticate, isAdmin, async (req, res) => {
    try {
      const users = await User.find({ role: 'user' }); 
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
