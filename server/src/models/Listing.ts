import { Schema } from 'mongoose';

enum Size {
  Studio = "Studio",
  OneBed = "One Bed",
  TwoBed = "Two Bed",
  ThreeBed = "Three Bed",
  FourBed = "Four Bed",
  FiveBed = "Five Bed",
}

const listingSchema = new Schema({
  webScraped: {
    type: Boolean,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  size: {
    type: Size,
    required: true
  },
  schoolDistrict: {
    type: String
  },
  pets: {
    type: Boolean
  },
  utilities: {
    type: Boolean
  },
  furnished: {
    type: Boolean
  },
  distTransportation: {
    type: Boolean
  },
  landlord: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number
  },
  linkOrig: {
    type: String,
    required: true
  },
  linkApp: {
    type: String,
    required: true
  }
}, { timestamps: true })


