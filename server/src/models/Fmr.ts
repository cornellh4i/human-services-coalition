const mongoose = require('mongoose')

import { Schema } from 'mongoose';

const fmrSchema = new Schema({
  studio: {
    type: Number,
  },
  oneBed: {
    type: Number,
  },
  twoBed: {
    type: Number,
  },
  threeBed: {
    type: Number,
  },
  fourBed: {
    type: Number,
  },
  fiveBed: {
    type: Number,
  },
  sixBed: {
    type: Number,
  },
}, { timestamps: true })

module.exports = mongoose.model('FMRprices', fmrSchema)