const winston = require('winston');
const mongoose = require('mongoose');
require('dotenv').config();

//connect to mongo db
module.exports = function() {
  mongoose
    .connect(
      process.env.MONGO_URL,
      {useNewUrlParser:true}
    )
    .then(()=>{
      winston.info('Connected to MongoDB...')
    })
    .catch(error => {
        console.log('something happened',error);
  })
}