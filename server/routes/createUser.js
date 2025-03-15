const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');


// POST request to create user
router.post("/register", [

    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
],
    async (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        try {
            // Check if user already exists
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = new User({
                username, // Changed from username to name
                email,
                password: hashedPassword,
            });

            await newUser.save();
            return res.status(201).json({ status: true, message: 'Record registered' });
        } catch (error) {
            console.error(error); // Logging error for debugging
            return res.status(500).json({ message: 'Server error' });
        }
    });



//     // Login Route
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ status: 'error', message: 'Invalid email or password' });
//         }
  
//         // Compare password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ status: 'error', message: 'Invalid email or password' });
//         }
  
//         // Generate JWT token with user ID & username
//         const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
//         // Set token in httpOnly cookie
//         res.cookie('authToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 });
  
//         res.status(200).json({
//             status: 'success',
//             message: 'Login successful',
//             token,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: 'error', message: 'Internal Server Error' });
//     }
//   });






// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ status: 'error', message: 'Invalid email or password' });
      }

      // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(400).json({ status: 'error', message: 'Invalid email or password' });
      }

      // Generate JWT token with user ID, username & email
      const token = jwt.sign(
          { id: user._id, username: user.username, email: user.email }, // ✅ Fix: Email added in token payload
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );

      // Set token in httpOnly cookie
      res.cookie('authToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 });

      // ✅ Fix: Include `email` & `username` in response
      res.status(200).json({
          status: 'success',
          message: 'Login successful',
          token,
          id: user._id,
          username: user.username,
          email: user.email, // ✅ Fix: Email added in response
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});





  let tokenBlacklist = [];

  router.post("/logout", (req, res) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (token) {
      tokenBlacklist.push(token); // Token blacklist mein dal dein
    }
    res.json({ message: "Logged out successfully" });
  });
  
  // Middleware to check blacklisted tokens
  const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
  
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });
  
    if (tokenBlacklist.includes(token)) {
      return res.status(403).json({ message: "Token is invalid. Please login again." });
    }
  
    try {
      const decoded = jwt.verify(token, "your_secret_key");
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Token is not valid" });
    }
  };
  



//   router.post("/logout", (req, res) => {
//     res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" }); 
//     return res.json({ message: "Logged out successfully" });
//   });
  

// router.post("/logout", (req, res) => {
//     res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "lax" });
//     return res.json({ message: "Logged out successfully" });
//   });
  
  // Logout Route
//   router.post('/api/logout', (req, res) => {
//       res.clearCookie('authToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  
//       res.status(200).json({ status: 'success', message: 'Logged out successfully' });
//   });
  


      
module.exports = router;




