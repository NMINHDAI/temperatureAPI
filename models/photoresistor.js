const mongoose = require('mongoose');
const yup = require("yup");

const PhotoresistorSchema = new mongoose.Schema({
  value:{
    type: Boolean,
  },
});

const validatePhotoresistor = async (photoresistor) => {
  const schema = yup.object().shape({
      value: yup.number().test('is boolean',
      'Please enter either 1 or 0',
      (value) => value === 0 || value === 1)
  });

  try {
    const photoresistor_1 = await schema
      .validate(photoresistor);
    return photoresistor_1;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

exports.Photoresistor = new mongoose.model("Photoresistor", PhotoresistorSchema);
exports.validatePhotoresistor = validatePhotoresistor;