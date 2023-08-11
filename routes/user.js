const express = require('express');
const server = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const secretKey = require('./configs').secretKey;
const hostUrl = require('./configs').hostUrl;
const {auth} = require('./middleware');

server.get('', auth, function (req, res) {
  res.render("profile");
});

server.get('/login', function (req, res) {
  if (req.cookies['auth_token']) {
    res.redirect(hostUrl + 'user');
  } else {
    res.render('login');
  }
});

server.post(
  '/signup',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 5 or more characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try  {
        const { name, email, password } = req.body;
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new user
        user = new User({
          name,
          email,
          password,
        });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user
        await user.save();

        const payload = {
          user: {
            name: user.name,
            email: user.email,
          },
        };

        // Generate a JWT token
        jwt.sign(
          payload,
          secretKey,
          { expiresIn: 3600 }, // Token expires in 1 hour
          (err, token) => {
            if (err) throw err;
            res.cookie("auth_token", token);
            res.json({
              profileUrl: hostUrl + 'user'
            });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );


  server.post(
    '/login',
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      try {
        let user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
          user: {
            name: user.name,
            email: user.email,
          },
        };

        // Generate a JWT token
        jwt.sign(
          payload,
          secretKey,
          { expiresIn: 3600 }, // Token expires in 1 hour
          (err, token) => {
            if (err) throw err;
            console.log('code worked');
            res.cookie("auth_token", token);
            res.json({ 
              profileUrl: hostUrl + 'user'
             });
          }
          );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );

  server.get('/logout', function (req, res) {
    res.clearCookie('auth_token');
    res.redirect(hostUrl);
  })
  module.exports = server;
  