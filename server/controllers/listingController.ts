const Listing = require("../src/models/Listing");
import mongoose from 'mongoose';
import { json } from 'stream/consumers';
import { spawn } from 'child_process';

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

const createScrapedListing = async (req, res) => {
  // collect data from script

  const pythonProcess = spawn('python', ['scraping.py']);
  
  //const listings = [];
  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

}
  //res.status(200).json(listing);

  //console.log(listing);

  // const { id } = req.params
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   // error returned here
  //   return res.status(404).json({ error: 'No such listing 2' })
  // }

  //createListing(listing, 201);

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
  deleteListing,
  createScrapedListing
}