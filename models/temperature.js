const mongoose = require('mongoose');
const yup = require("yup");

const TemperatureSchema = new mongoose.Schema({
  value:{
    type: Number,
  },
});

const validateTemperature = async (temperature) => {
  const schema = yup.object().shape({
      value: yup.number()
      .typeError('You must specify a number')
      .min(0, 'Min value 0.')
      .max(50, 'Max value 50.')
  });

  try {
    const temperature_1 = await schema
      .validate(temperature);
    return temperature_1;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

exports.Temperature = new mongoose.model("Temperature", TemperatureSchema);
exports.validateTemperature = validateTemperature;