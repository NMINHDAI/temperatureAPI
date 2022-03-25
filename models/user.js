const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const yup = require("yup");

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    minlength:3,
    maxlength:50
  },
  email:{
    type:String,
    required:true,
    minlength:3,
    maxlength:50,
    unique: true,
  },
  password:{
    type:String,
    required:true,
    minlength:5,
    maxlength:1024
  },
  isAdmin: Boolean
});

UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, process.env.jwtPrivateKey);
  return token;
}

const validateUser = async (user) => {
  const schema = yup.object().shape({
    name: yup.string().required().min(3).max(50)
  });
  
  try {
    const user1 = await schema.validate(user);
    return user1;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

exports.User = new mongoose.model("User", UserSchema);
exports.validateUser = validateUser;