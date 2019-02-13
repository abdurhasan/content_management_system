const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mapsSchema = new Schema({

  title: {
    type: String,
    trim: true,
    required: true,
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }

})

module.exports = mongoose.model('Maps', mapsSchema);
