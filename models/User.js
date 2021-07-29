const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  skill_1: {
    type: String,
    required: true
  },
  skill_2: {
    type: String,
    required: true
  },
  skill_3: {
    type: String,
    required: true
  },
  skill_4: {
    type: String,
    required: true
  },
  skill_5: {
    type: String,
    required: true
  },
  skill_6: {
    type: String,
    required: true
  },
  skill_7: {
    type: String,
    required: true
  },
  skill_8: {
    type: String,
    required: true
  },
  skill_9: {
    type: String,
    required: true
  },
  skill_10: {
    type: String,
    required: true
  },
  project1head: {
    type: String,
    required: true
  },
  project1description: {
    type: String,
    required: true
  },
  project2head: {
    type: String,
    required: true
  },
  project2description: {
    type: String,
    required: true
  },
  project3head: {
    type: String,
    required: true
  },
  project3description: {
    type: String,
    required: true
  },
  instagram: {
    type: String,
    required: true
  },
  twitter: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;