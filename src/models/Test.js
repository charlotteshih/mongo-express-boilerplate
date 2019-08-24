const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
  title: String,
  content: String
});

let Test = mongoose.model('Test', TestSchema);

module.exports = Test;