const mongoose = require('mongoose')

import { Schema } from 'mongoose';

enum ContactPref {
  Email = "Email",
  Phone = "Phone Number"
}

enum Gender {
  Female = "Female",
  Male = "Male",
  NonBinary = "Non-Binary",
  Other = "Other",
  NoResponse = "Prefer Not to Respond"
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    required: true
  },
  supervisor: {
    type: String,
    required: true
  },
  mInitial: {
    type: String,
  },
  birthDate: {
    type: Date
  },
  email: {
    type: String
  },
  phone: {
    type: Number
  },
  prefName: {
    type: String
  },
  gender: {
    type: String,
    enum: Gender
  },
  race: {
    type: String
  },
  ethnicity: {
    type: String
  },
  contactPref: {
    type: String,
    enum: ContactPref,
  },
  recentlyViewed: {
    type: Array
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)