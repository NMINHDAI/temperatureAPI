const mongoose = require("mongoose");
const yup = require("yup");

const TransportationSchema = new mongoose.Schema({
  transportationName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 5000,
  },
  urlImage: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  startStation: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  endStation: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  station: [String],
});

const validateTransportation = async (transportation) => {
  const schema = yup.object().shape({
    transportationName: yup.string().required().min(3).max(50)
  });

  try {
    const transportation_1 = await schema
      .validate(transportation);
    return transportation_1;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

exports.Transportation = new mongoose.model("Transportation", TransportationSchema);
exports.validateTransportation = validateTransportation;
