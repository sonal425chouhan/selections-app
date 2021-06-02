var mongoose = require('mongoose');

var User = mongoose.model('User', {
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

module.exports = {User}
