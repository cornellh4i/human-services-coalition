const Admin = require("../models/Admin");
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

// GET admins based off sort query
const getSortAdmins = async (req, res) => {
  const search = req.query.search || '';
  const sortName = req.query.sortName || '';
  const sortOrder = req.query.sortOrder || '';
  const affiliation = req.query.affiliation || '';

  let filter = search ? {
    $or: [
      { fName: { $regex: new RegExp(search, 'i') } },
      { lName: { $regex: new RegExp(search, 'i') } },
      { affiliation: { $regex: new RegExp(search, 'i') } },
    ]
  } : {};

  let sortObject = {};
  if (sortName) {
    if (sortOrder) {
      sortObject[sortName] = sortOrder;
    } else {
      sortObject[sortName] = 'asc';
    }
  }
  if (affiliation == 'HSC') {
    console.log("run")
    filter["affiliation"] = { $regex: /HSC/ };
  } else if (affiliation == 'Non-HSC') {
    filter["affiliation"] = { $not: /HSC/ };
  }

  const admins = await Admin.find(filter).sort(sortObject);

  res.status(200).json(admins);
};

// POST (add) a new admin
const createAdmin = async (req, res) => {
  const {
    affiliation,
    username,
    password,
    fName,
    lName,
    mInitial,
    prefName,
    gender,
    race,
    email,
    phone,
    contactPref,
    birthdate
  } = req.body

  try {
    const admin = await Admin.create({
      affiliation,
      username,
      password,
      fName,
      lName,
      mInitial,
      prefName,
      gender,
      race,
      email,
      phone,
      contactPref,
      birthdate
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
  updateAdmin,
  getSortAdmins
}

