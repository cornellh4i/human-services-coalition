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
  NoResponse = "Prefer Not To Respond"
}

const userSchema = new Schema({
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
  voucherType: {
    type: String,
    required: true,
  },
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String,
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
    type: String
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
  contactPref: {
    type: String,
    enum: ContactPref,
  },
  recentlyViewed: {
    type: Array
  },
  appliedListings: {
    type: Array
  },
  additionalDays: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

userSchema.pre(
  'save',
  async function(next) {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  }
);

userSchema.methods.isValidPassword = async function(password) {
  const compare = await bcrypt.compare(password, this.password);

  return compare;
}

module.exports = mongoose.model('User', userSchema)