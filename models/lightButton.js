const mongoose = require('mongoose');
const yup = require("yup");

const LightButtonSchema = new mongoose.Schema({
  value:{
    type: Boolean,
  },
});

const validateLightButton = async (lightButton) => {
  const schema = yup.object().shape({
      value: yup.number().test('is boolean',
      'Please enter either 1 or 0',
      (value) => value === 0 || value === 1)
  });

  try {
    const lightButton_1 = await schema
      .validate(lightButton);
    return lightButton_1;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

exports.LightButton = new mongoose.model("LightButton", LightButtonSchema);
exports.validateLightButton = validateLightButton;