const Admin = require("../src/models/Admin");
import mongoose from 'mongoose';

// GET all admin
const getAdmins = async (req, res) => {
  const admins = await Admin.find({}).sort({ createdAt: -1 })

  res.status(200).json(admins)
}

// GET a specific admin
const getAdmin = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such admin' })
  }

  const admin = await Admin.findById(id)

  if (!admin) {
    return res.status(404).json({ error: 'No such admin' })
  }

  res.status(200).json(admin)
}

// POST (add) a new admin
const createAdmin = async (req, res) => {
  const {
    username,
    password,
    fName,
    lName,
    mInitial,
    prefName,
    gender,
    race,
    ethnicity,
    email,
    phone,
    contactPref,
    company
  } = req.body

  try {
    const admin = await Admin.create({
      username,
      password,
      fName,
      lName,
      mInitial,
      prefName,
      gender,
      race,
      ethnicity,
      email,
      phone,
      contactPref,
      company
    })
    res.status(200).json(admin)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

// DELETE a specific admin
const deleteAdmin = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such admin' })
  }

  const admin = await Admin.findOneAndDelete({ _id: id })

  if (!admin) {
    return res.status(404).json({ error: 'No such admin' })
  }

  res.status(200).json(admin)
}

// PATCH (edit) a specific admin
const updateAdmin = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such admin' })
  }

  try {
    const admin = await Admin.findOneAndUpdate({ _id: id }, {
      ...req.body
    })
    if (!admin) {
      return res.status(400).json({ error: 'No such admin' })
    }
    res.status(200).json(admin)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

// Exports
module.exports = {
  getAdmin,
  getAdmins,
  createAdmin,
  deleteAdmin,
  updateAdmin
}

