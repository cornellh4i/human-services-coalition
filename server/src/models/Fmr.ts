const mongoose = require('mongoose')

import { Schema } from 'mongoose';

const fmrSchema = new Schema({
  studio: {
    type: Number,
    required: true
  },
  oneBed: {
    type: Number,
    required: true
  },
  twoBed: {
    type: Number,
    required: true
  },
  threeBed: {
    type: Number,
    required: true
  },
  fourBed: {
    type: Number,
    required: true
  },
  fiveBed: {
    type: Number,
    required: true
  },
  sixBed: {
    type: Number,
    required: true
  },
}, { timestamps: true })

module.exports = mongoose.model('FMRprices', fmrSchema)