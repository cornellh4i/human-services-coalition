const Listing = require("../src/models/Listing");
import mongoose from 'mongoose';

// GET all housing listings
const getListings = async (req, res) => {
  const listings = await Listing.find({}).sort({ createdAt: -1 })

  res.status(200).json(listings)
}

// GET a specific housing listing (by id)
const getListing = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such listing' })
  }

  const listing = await Listing.findById(id)

  if (!listing) {
    return res.status(404).json({ error: 'No such listing' })
  }

  res.status(200).json(listing)
}


// POST (add) a new housing listing
const createListing = async (req, res) => {
  const {
    webScraped,
    pictures,
    price,
    size,
    numBath,
    schoolDistrict,
    pets,
    utilities,
    furnished,
    distTransportation,
    landlord,
    landlordEmail,
    landlordPhone,
    linkOrig,
    linkApp
  } = req.body

  try {
    const listing = await Listing.create({
      webScraped,
      pictures,
      price,
      size,
      numBath,
      schoolDistrict,
      pets,
      utilities,
      furnished,
      distTransportation,
      landlord,
      landlordEmail,
      landlordPhone,
      linkOrig,
      linkApp
    })
    res.status(200).json(listing)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

// PATCH (edit) a specific housing listing
const updateListing = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such listing' })
  }

  const listing = await Listing.findOneAndUpdate({ _id: id }, {
    ...req.body
  })
  if (!listing) {
    return res.status(400).json({ error: 'No such listing' })
  }

  res.status(200).json(listing)

}

// DELETE a specific housing listing
const deleteListing = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such listing' })
  }

  const listing = await Listing.findOneAndDelete({ _id: id })
  if (!listing) {
    return res.status(400).json({ error: 'No such listing' })
  }

  res.status(200).json(listing)
}

module.exports = {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing
}