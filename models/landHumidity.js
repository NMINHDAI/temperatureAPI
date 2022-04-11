const mongoose = require('mongoose');
const yup = require("yup");

const LandHumiditySchema = new mongoose.Schema({
  value:{
    type: Number,
  },
});

const validateLandHumidity = async (landHumidity) => {
  const schema = yup.object().shape({
      value: yup.number()
      .typeError('You must specify a number')
      .min(0, 'Min value 0.')
      .max(1024, 'Max value 1024.')
  });

  try {
    const landHumidity_1 = await schema
      .validate(landHumidity);
    return landHumidity_1;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

exports.LandHumidity = new mongoose.model("LandHumidity", LandHumiditySchema);
exports.validateLandHumidity = validateLandHumidity;