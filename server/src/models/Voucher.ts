const mongoose = require('mongoose')

import { Schema } from 'mongoose';

const voucherSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
}, { timestamps: true })

module.exports = mongoose.model('Voucher', voucherSchema)