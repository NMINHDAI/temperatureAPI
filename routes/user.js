const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validateUser, User } = require("../models/user");

router.get('/me', auth, async(req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

//POST: CREATE A NEw
router.post("/", [auth, isAdmin], async (req, res) => {
  const error = await validateUser(req.body);
  if (error.message) res.status(400).json({ err: error.details[0].message });

  let user = await User.findOne({email: req.body.email});
  if (user) return res.status(400).send('User already registered.');
  
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: false
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  
  res.header('x-auth-token', token).send({user: user._id});
});




module.exports = router;
