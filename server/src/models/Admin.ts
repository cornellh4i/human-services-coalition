const mongoose = require('mongoose')

import { Schema } from 'mongoose';

const bcrypt = require('bcrypt');

enum ContactPref {
  NoInput = "",
  Email = "Email",
  Phone = "Phone Number"
}

enum Gender {
  NoInput = "",
  Female = "Female",
  Male = "Male",
  NonBinary = "Non-Binary",
  Other = "Other",
  NoResponse = "Prefer Not to Respond"
}

const adminSchema = new Schema({
  affiliation: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String,
    required: true
  },
  mInitial: {
    type: String
  },
  prefName: {
    type: String,
  },
  gender: {
    type: String,
    enum: Gender
  },
  race: {
    type: String
  },
  email: {
    type: String,
  },
  phone: {
    type: String
  },
  birthdate: {
    type: Date
  },
  contactPref: {
    type: String,
    enum: ContactPref
  }
}, { timestamps: true })

adminSchema.pre(
  'save',
  async function(next) {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  }
);

adminSchema.methods.isValidPassword = async function(password) {
  const compare = await bcrypt.compare(password, this.password);

  return compare;
}

module.exports = mongoose.model('Admin', adminSchema)