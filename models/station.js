const mongoose = require('mongoose');
const yup = require("yup");

const StationSchema = new mongoose.Schema({
    stationName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:40
    },
    address:{
        type:String,
        required:true,
        minlength:3,
        maxlength:200
    },
    cityId:{
      type:String,
      minlength:3,
      maxlength:50
    },
    contactName:{
      type:String,
      required:true,
      minlength:3,
      maxlength:40
    },
    phone: [String],
    urlImage: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    workTime: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    
    transportationId:{
        type:String,
        required:true
    },

});

const validateStation = async (station) => {
    const schema = yup.object().shape({
        stationName: yup.string().required().min(3).max(50)
    });
  
    try {
    const station_1 = await schema
      .validate(station);
    return station_1;
  } catch (error) {
    return {
      message: error.message,
    };
  }
    };

exports.Station = new mongoose.model("Station", StationSchema);
exports.validateStation = validateStation;