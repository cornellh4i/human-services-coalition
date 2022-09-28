const mongoose = require('mongoose')

const Schema = mongoose.Schema

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
  fName: {
    type: String,
    required: true
  },
  mInitial: {
    type: String,
  },
  lName: {
    type: String,
    required: true
  },
  prefName: {
    type: String
  },
  gender: {
    type: Gender
  },
  birthDate: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  contactPref: {
    type: ContactPref,
  },
  dateCreated: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  recentlyViewed: {
    type: Array
  }
}, { timestamps: true })

