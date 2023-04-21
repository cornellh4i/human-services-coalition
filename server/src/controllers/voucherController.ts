const Voucher = require("../models/Voucher");
import mongoose from 'mongoose';

// GET all vouchers
const getVouchers = async (req, res) => {
  const vouchers = await Voucher.find({}).sort({ createdAt: -1 })
  res.status(200).json(vouchers)
}

// GET a specific voucher
const getVoucher = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such voucher' })
  }

  const voucher = await Voucher.findById(id)

  if (!voucher) {
    return res.status(404).json({ error: 'No such voucher' })
  }

  res.status(200).json(voucher)
}

// POST (add) a new voucher
const createVoucher = async (req, res) => {
  const {
    name,
    percentage
  } = req.body

  try {
    const voucher = await Voucher.create({
      name,
      percentage
    })
    res.status(200).json(voucher)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

// DELETE a specific user
const deleteVoucher = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such voucher' })
  }

  const voucher = await Voucher.findOneAndDelete({ _id: id })

  if (!voucher) {
    return res.status(404).json({ error: 'No such voucher' })
  }

  res.status(200).json(voucher)
}

// Exports
module.exports = {
  getVoucher,
  getVouchers,
  createVoucher,
  deleteVoucher
}