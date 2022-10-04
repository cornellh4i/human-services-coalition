import { Schema } from 'mongoose';
const mongoose = require('mongoose')


enum Size {
  Studio = "Studio",
  OneBed = "One Bed",
  TwoBed = "Two Bed",
  ThreeBed = "Three Bed",
  FourBed = "Four Bed",
  FiveBed = "Five Bed",
}

enum Distance {
  Close = "Near",
  Medium = "Medium",
  Far = "Far"
}

const listingSchema = new Schema({
  webScraped: {
    type: Boolean,
    required: true
  },
  pictures: {
    type: Array,
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
  numBath: {
    type: Number,
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
    type: Distance
  },
  landlord: {
    type: String,
    required: true
  },
  landlordEmail: {
    type: String,
  },
  landlordPhone: {
    type: Number
  },
  linkOrig: {
    type: String
  },
  linkApp: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model('Listing', listingSchema)

