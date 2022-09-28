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
    type: String,
  },
  gender: {
    type: Gender,
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  contactPref: {
    type: ContactPref,
  },
  company: {
    type: String,
  },
  password: {
    type: String,
  }
x


