const User = require("../models/User");
import mongoose from 'mongoose';

// GET all users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 })
  res.status(200).json(users)
}

//GET users according to sort
const getSortUsers = async (req, res) => {
  const search = req.query.search || '';
  const sortName = req.query.sortName || '';
  const sortOrder = req.query.sortOrder || '';
  const voucher = req.query.voucher || '';
  console.log(search)
  console.log(sortName)
  console.log(sortOrder)
  console.log(voucher)

  let filter = search ? {
    $or: [
      { fName: { $regex: new RegExp(search, 'i') } },
      { lName: { $regex: new RegExp(search, 'i') } },
      { voucher: { $regex: new RegExp(search, 'i') } },
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
  if (voucher == 'Voucher I') {
    filter["voucher"] = { $regex: /Voucher I/ };
  } else if (voucher == 'Voucher II') {
    filter["voucher"] = { $regex: /Voucher II/ };
  } else if (voucher == 'Voucher III') {
    filter["voucher"] = { $regex: /Voucher III/ };
  } else if (voucher == 'Voucher IV') {
    filter["voucher"] = { $regex: /Voucher IV/ };
  }
  else if (voucher == "None") {
    filter["affiliation"] = { $not: /Voucher/ };
  }

  const users = await User.find(filter).sort(sortObject);

  res.status(200).json(users);
};

// GET a specific user
const getUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' })
  }

  const user = await User.findById(id)

  if (!user) {
    return res.status(404).json({ error: 'No such user' })
  }

  res.status(200).json(user)
}

// POST (add) a new user
const createUser = async (req, res) => {
  const {
    username,
    password,
    voucherType,
    fName,
    lName,
    supervisor,
    mInitial,
    birthDate,
    email,
    phone,
    prefName,
    gender,
    race,
    contactPref,
    recentlyViewed
  } = req.body

  try {
    const user = await User.create({
      username,
      password,
      voucherType,
      fName,
      lName,
      supervisor,
      mInitial,
      birthDate,
      email,
      phone,
      prefName,
      gender,
      race,
      contactPref,
      recentlyViewed
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

// DELETE a specific user
const deleteUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' })
  }

  const user = await User.findOneAndDelete({ _id: id })

  if (!user) {
    return res.status(404).json({ error: 'No such user' })
  }

  res.status(200).json(user)
}

// PATCH (edit) a specific user
const updateUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' })
  }

  try {
    const user = await User.findOneAndUpdate({ _id: id }, {
      ...req.body
    })
    if (!user) {
      return res.status(400).json({ error: 'No such user' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

// Exports
module.exports = {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getSortUsers
}