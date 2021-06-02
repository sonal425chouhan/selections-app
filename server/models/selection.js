var mongoose = require('mongoose');

var Selection = mongoose.model('Selection', {
 email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

module.exports = {Selection};
