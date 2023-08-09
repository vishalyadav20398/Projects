const express = require('express');
const server = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const secretKey = "Vishal_Yadav";

server.get('', function (req, res) {
    res.render('homepage');
});

module.exports = server;