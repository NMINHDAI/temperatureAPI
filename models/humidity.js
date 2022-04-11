const mongoose = require('mongoose');
const yup = require("yup");

const HumiditySchema = new mongoose.Schema({
  value:{
    type: Number,
  },
});

const validateHumidity = async (humidity) => {
  const schema = yup.object().shape({
      value: yup.number()
      .typeError('You must specify a number')
      .min(0, 'Min value 0.')
      .max(100, 'Max value 100.')
  });

  try {
    const humidity_1 = await schema
      .validate(humidity);
    return humidity_1;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

exports.Humidity = new mongoose.model("Humidity", HumiditySchema);
exports.validateHumidity = validateHumidity;