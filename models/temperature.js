const mongoose = require('mongoose');
const yup = require("yup");

const TemperatureSchema = new mongoose.Schema({
    value:{
        type:Number,
    }

});

const validateTemperature = async (temperature) => {
    const schema = yup.object().shape({
        value: yup.number().integer().required().min(1).max(50)
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