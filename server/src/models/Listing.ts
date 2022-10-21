const mongoose = require('mongoose')

import { Schema } from 'mongoose';

enum Size {
  Studio = "Studio",
  OneBed = "One Bed",
  TwoBed = "Two Bed",
  ThreeBed = "Three Bed",
  FourBed = "Four Bed",
  FiveBed = "Five Bed"
}

enum Distance {
  Close = "Close",
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
    type: String,
    enum: Size,
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
    type: String,
    enum: Distance
  },
  landlord: {
    type: String,
    required: true
  },
  landlordEmail: {
    type: String,
  },
  landlordPhone: {
    type: String
  },
  linkOrig: {
    type: String
  },
  linkApp: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model('Listing', listingSchema)