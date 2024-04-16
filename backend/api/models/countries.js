
const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  img: {
    type: Buffer,
    required: true,
  },
  imgType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["send", "recieve","send_recieve"],
    required: true,

  },

});



const Country = mongoose.model("country", countrySchema);
module.exports = Country