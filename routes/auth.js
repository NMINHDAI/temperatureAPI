const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require("../models/user");
const yup = require("yup");

//POST: CREATE A NEW 
router.post("/", async (req, res) => {
  const error = await validate(req.body);
  if (error.message) res.status(400).json({ err: error.message });

  let user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('Invalid email or password.');
  
  const validatePassword = await bcrypt.compare(req.body.password, user.password);
  if (!validatePassword ) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  res.send(token);
});

const validate = async (req) => {
  const schema = yup.object().shape({
    email: yup.string().required().min(3).max(50)
  });
  try {
    const user1 = await schema.validate(req);
    return user1;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

module.validate = validate;
module.exports = router;
