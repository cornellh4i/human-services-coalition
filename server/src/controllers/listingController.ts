const Listing = require("../models/Listing");
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

async function getListingByCategory(category, queryValue) {
  let query = {};

  // Set the query object based on the category
  switch (category) {
    case 'address':
      // Use a case-insensitive regular expression to match similar strings
      query['streetAddress'] = new RegExp(queryValue, 'i');
      break;
    case 'city':
      query['city'] = new RegExp(queryValue, 'i');
      break;
    case 'state':
      query['state'] = new RegExp(queryValue, 'i');
      break;
    case 'country':
      query['country'] = new RegExp(queryValue, 'i');
      break;
    case 'zipCode':
      query['zipCode'] = queryValue;
      break;
    case 'price':
      query['price'] = {
        $gte: queryValue[0],
        $lte: queryValue[1]
      }
      break;
    case 'size':
      query['size'] = queryValue;
      break;
    case 'unitType':
      query['unitType'] = { $in: queryValue };
      break;
    case 'numBath':
      query['numBath'] = queryValue;
      break;
    case 'schoolDistrict':
      query['schoolDistrict'] = queryValue;
      break;
    case 'pets':
      query['pets'] = queryValue;
      break;
    case 'utilities':
      query['utilities'] = queryValue;
      break;
    case 'furnished':
      query['furnished'] = queryValue;
      break;
    case 'distTransportation':
      query['distTransportation'] = queryValue;
      break;
    case 'landlord':
      query['landlord'] = queryValue;
      break;
    case 'landlordEmail':
      query['landlordEmail'] = queryValue;
      break;
    case 'landlordPhone':
      query['landlordPhone'] = queryValue;
      break;
    case 'linkOrig':
      query['linkOrig'] = queryValue;
      break;
    case 'linkApp':
      query['linkApp'] = queryValue;
      break;
    case 'dateAvailable':
      query['dateAvailable'] = queryValue;
      break;
    case 'description':
      // Use a case-insensitive regular expression to match similar strings
      query['description'] = new RegExp(queryValue, 'i');
      break;
    default:
      throw new Error('Invalid category');
  }

  const listings = await Listing.find(query);

  return listings;
}

// POST (add) a new housing listing
const createListing = async (req, res) => {
  const {
    webScraped,
    description,
    streetAddress,
    city,
    state,
    country,
    zipCode,
    pictures,
    price,
    size,
    unitType,
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
    linkApp,
    dateAvailable
  } = req.body

  try {
    const listing = await Listing.create({
      webScraped,
      description,
      streetAddress,
      city,
      state,
      country,
      zipCode,
      pictures,
      price,
      size,
      unitType,
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
      linkApp,
      dateAvailable
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

  try {
    const listing = await Listing.findOneAndUpdate({ _id: id }, {
      ...req.body
    })
    if (!listing) {
      return res.status(400).json({ error: 'No such listing' })
    }
    res.status(200).json(listing)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
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


// Exports
module.exports = {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing
}