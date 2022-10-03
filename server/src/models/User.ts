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
    type: Gender
  },
  race: {
    type: String
  },
  ethnicity: {
    type: String
  },
  contactPref: {
    type: ContactPref,
  },
  recentlyViewed: {
    type: Array
  }
}, { timestamps: true })

