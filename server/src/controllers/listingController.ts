const Listing = require("../models/Listing");
const fs = require('fs').promises;
import mongoose from 'mongoose';
import s3utils from '../utils/s3';
import { successJson, errorJson } from '../utils/jsonResponses';
import { spawn } from 'child_process';
import { exec } from 'child_process';

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

// GET housing listings based on filters
const getListingByCategory = async (req, res) => {
  let query = {};

  // Generate switch cases dynamically based on query parameters received
  for (const key in req.query) {
    const queryValue = req.query[key];
    switch (key) {
      case 'address':
        query['streetAddress'] = new RegExp(queryValue, 'i');
        break;
      case 'city':
        query['city'] = new RegExp(queryValue, 'i');
        break;
      case 'minPrice':
        if (query['price'] == undefined) {
          query['price'] = { $gte: queryValue }
        }
        else {
          query['price']['$gte'] = queryValue
        }
        break;
      case "maxPrice":
        if (query['price'] == undefined) {
          query['price'] = { $lte: queryValue }
        }
        else {
          query['price']['$lte'] = queryValue
        }
        break;
      case 'unitType':
        query['unitType'] = { $in: queryValue.split(',') };
        break;
      case 'house':
        if (queryValue == "on") {
          if (query['unitType'] == undefined) {
            query['unitType'] = { $in: ["House"] }
          }
          else {
            query['unitType']['$in'].push("House")
          }
        }
        break;
      case 'condo':
        if (queryValue == "on") {
          if (query['unitType'] == undefined) {
            query['unitType'] = { $in: ["Condo"] }
          }
          else {
            query['unitType']['$in'].push("Condo")
          }
        }
        break;
      case 'apartment':
        if (queryValue == "on") {
          if (query['unitType'] == undefined) {
            query['unitType'] = { $in: ["Apartment"] }
          }
          else {
            query['unitType']['$in'].push("Apartment")
          }
        }
        break;
      case 'single':
        if (queryValue == "on") {
          if (query['unitType'] == undefined) {
            query['unitType'] = { $in: ["Single"] }
          }
          else {
            query['unitType']['$in'].push("Single")
          }
        }
        break;
      case 'numBath':
        query['numBath'] = parseFloat(queryValue);
        break;
      case 'numBed':
        let sizes = ["Studio", "One Bed", "Two Bed", "Three Bed",
          "Four Bed", "Five Bed", "Six Bed"]
        query['size'] = sizes[parseInt(queryValue)];
        break;
      case 'pets':
        if (queryValue == 'on') {
          query['pets'] = "true";
        }
        break;
      case 'utilities':
        if (queryValue == 'on') {
          query['utilities'] = "true";
        }
        break;
      case 'furnished':
        if (queryValue == 'on') {
          query['furnished'] = "true";
        }
        break;
      case 'disTransportation':
        query['distTransportation'] = queryValue;
        break;
      default:
        // Ignore unknown query parameters
        break;
    }
  }

  const listings = await Listing.find(query);

  res.status(200).json(listings);
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
      pictures: [],
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

    res.status(200).json({ id: listing._id })
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

// POST (add) webscraped listings
const createScrapedListing = async (req, res) => {
  // collect data from script
  const pythonProcess = spawn('python', ['scraping.py']);
  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  let data : any;
  exec('python scraping.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    const data = JSON.parse(stdout);
    console.log(`Name: ${data.description}`);
  });

  const  webScraped = data.webScraped,
    description = data.description,
    streetAddress = data.streetAddress,
    city = data.city,
    state = data.state,
    country = data.country,
    zipCode = data.zipCode,
    pictures = [],
    price = data.price,
    size = data.size,
    unitType = data.unitType,
    numBath = data.numBath,
    schoolDistrict = data.schoolDistrict,
    pets = data.pets,
    utilities = data.utilities,
    furnished = data.furnished,
    distTransportation = data.disTransportation,
    landlord = data.landlord,
    landlordEmail = data.landlordEmail,
    landlordPhone = data.landlordPhone,
    linkOrig = data.linkOrig,
    linkApp = data.linkApp,
    dateAvailable = data.dateAvailable

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

    res.status(200).json({ id: id })

  } catch (error) {
    res.send(errorJson(error));
  }
}

// before this is called, multer is called - middleware between front end and backend
// steps in and takes the pictures and downloads it onto server (/uploads) folder MAGIC
// use s3 module i have a file at this location, name for file and bucket to upload 
const updateListingPicture = async (req, res) => {
  const { id } = req.params
  try {
    const files = req.files;
    // We should check if the file exists, if it doesn't, return an error
    if (!files) {
      res.send(errorJson("No file uploaded"));
      return;
    }

    var temparr: string[] = req.body.arr

    // Now we send the file to S3 using our s3utils
    // 'name' is the text entered into the input field
    // and this is what the name of the file will be in s3
    files.forEach(async (file) => {
      const dirname = String(req.body.dirname)
      const filename1 = String(req.body.filename)
      const result = await s3utils.uploadFile(dirname, filename1, file, true)
      await fs.unlink(file.path);
    })

    await Listing.findOneAndUpdate(
      { _id: id }, // Filter: find the listing with the given ID
      { $set: { pictures: temparr } }, // Update: set the "pictures" field to the "pics" array
      (err, updatedListing) => {
        if (err) {
          console.error('Error updating listing:', err);
        } else {
          console.log('Updated listing:', updatedListing);
        }
      }
    );
    res.send(successJson({}));

  } catch (error) {
    res.send(errorJson(error));
    // res.status(200).json({ id: id })
  }
}

const getListingPicture = async (req, res) => {
  const { dir } = req.params
  const { file } = req.params

  const dirname = String(dir)
  const filename1 = String(file)

  const response = s3utils.getFileStream(dirname, filename1)

  if (response) {
    response.createReadStream().on('error', e => {
      console.log(e);
    }).pipe(res);
  }
}

const deleteListingPicture = async (req, res) => {
  const { id } = req.params

  try {
    const dirname = String(req.body.dirname)
    const filename = String(req.body.filename)

    var temparr: string[] = req.body.arr

    if (temparr[0] === "") { temparr = [] }

    const result = await s3utils.deleteImage(dirname, filename)

    await Listing.findOneAndUpdate(
      { _id: id }, // Filter: find the listing with the given ID
      { $set: { pictures: temparr } }, // Update: set the "pictures" field to the "pics" array
      (err, updatedListing) => {
        if (err) {
          console.error('Error updating listing:', err);
        } else {
          console.log('Updated listing:', updatedListing);
        }
      }
    );
    return res.send(successJson({}));
  }
  catch (error) {
    res.send(errorJson(error));
  }
}

// DELETE a specific housing listing
const deleteListing = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such listing' })
  }

  const dirname = String(req.body.dirname);

  const result = await s3utils.deleteDirectory(dirname);

  const listing = await Listing.findOneAndDelete({ _id: id })
  if (!listing) {
    return res.status(400).json({ error: 'No such listing' })
  }

  res.status(200).json(listing)
}

const deleteListings = async (req, res) => {
  const listing = await Listing.deleteMany({})
  res.status(200).json(listing)
}

// Exports
module.exports = {
  getListingByCategory,
  getListings,
  getListing,
  createListing,
  createScrapedListing,
  updateListing,
  deleteListing,
  deleteListings,
  updateListingPicture,
  getListingPicture,
  deleteListingPicture
}