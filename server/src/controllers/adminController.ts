const Admin = require("../models/Admin");
import mongoose from 'mongoose';

//GET admins based off sort
const getSortFilter = async (req, res) => {
  console.log("ran")
  const searchText = req.params.searchText || '';
  const sortOrder = req.params.sortOrder || '';
  const affiliation = req.params.affiliation || '';
  let sortName = ""
  if (req.sortName != "None") {
    sortName = req.sortName
    console.log(sortName)
  }
  console.log(searchText)

  const filter = searchText ? {
    $or: [
      { fName: { $regex: new RegExp(searchText, 'i') } },
      { lName: { $regex: new RegExp(searchText, 'i') } },
      { affiliation: { $regex: new RegExp(searchText, 'i') } },
      //{ createdAt: { $regex: new RegExp(searchText, 'i') } }
    ]
  } : {};

  const sortObject = {};
  if (sortName != "" && sortName != undefined) {
    if (sortOrder) {
      sortObject[sortName] = sortOrder;
    } else {
      sortObject[sortName] = 'asc';
    }
  }
  if (affiliation === 'HSC') {
    sortObject[affiliation] = { $regex: /HSC/ };
  } else if (affiliation === 'Non-HSC') {
    sortObject[affiliation] = { $not: /HSC/ };
  }

  const admins = await Admin.find(filter).sort(sortObject);

  res.status(200).json(admins);
};




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
  getSortFilter
}

