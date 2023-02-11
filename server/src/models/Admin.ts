const mongoose = require('mongoose')

import { Schema } from 'mongoose';

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

module.exports = mongoose.model('Admin', adminSchema)