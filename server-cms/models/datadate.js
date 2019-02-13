const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let datadateSchema = new Schema({

  letter: {
    type: Date,    
    required: true,
  },
  frequency: {
    type: Number,
    required: true
  }

})

// const User = mongoose.model('User',userSchema);

// module.exports = { User }



module.exports = mongoose.model('Datadate', datadateSchema);
