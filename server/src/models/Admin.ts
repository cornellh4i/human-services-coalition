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

const adminSchema = new Schema({
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
  mInitial: {
    type: String
  },
  prefName: {
    type: String,
  },
  gender: {
    type: Gender,
  },
  race: {
    type: String
  },
  ethnicity: {
    type: String
  },
  email: {
    type: String,
  },
  phone: {
    type: String
  },
  contactPref: {
    type: ContactPref,
  },
  company: {
    type: String,
  },
}, { timestamps: true })


