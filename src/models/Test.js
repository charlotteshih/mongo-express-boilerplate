const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
  title: { type: String, trim: true, default: '' },
  content: { type: String, trim: true, default: '' }
});

let Test = mongoose.model('Test', TestSchema);

module.exports = Test;