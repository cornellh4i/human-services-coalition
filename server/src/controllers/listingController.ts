const Listing = require("../models/Listing");
import mongoose from 'mongoose';
import multer from 'multer';
// const multer = require('multer');
// const multerS3 = require('multer-s3');
const fs = require('fs').promises;
import s3utils from '../utils/s3';

import { successJson, errorJson } from '../utils/jsonResponses';

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
  console.log(listings)

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

// PATCH (edit) a specific housing listing
const updateListing = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such listing' })
  }

  try {
    const temp = await Listing.findById({ _id: id })

    const listing = await Listing.findOneAndUpdate({ _id: id }, {
      ...req.body
    })
    if (!listing) {
      return res.status(400).json({ error: 'No such listing' })
    }

    res.status(200).json({ id: id })
    //res.status(200).json({ id: listing._id })

  } catch (error) {
    console.log("NOT_SAVED")
    //res.status(400).json({ error: (error as Error).message })
    console.log(error)
    res.send(errorJson(error));
  }
}
//before this is called multer is called - middleware between front end and backend
//steps in and takes the pictures and downloads it onto server (/uploads) folder MAGIC
//use s3 module i have a file at this location, name for file and bucket to upload 
const updateListingPicture = async (req, res) => {
  const { id } = req.params
  // ADD CODE HERE TO UPLOAD TO S3

  try {
    const files = req.files;

    //console.log(files)
    // We should check if the file exists, if it doesn't, return an error
    if (!files) {
      res.send(errorJson("No file uploaded"));
      return;
    }
    console.log("PRINTING THEEE body")
    console.log(req.body)
    var temparr: string[] = req.body.arr
    console.log("thIS IS OLD TEMPADR")


    if (temparr[0] == "") {
      console.log("HEREEEEEE")
      temparr = []
    }
    const temp = await Listing.findById({ _id: id })
    console.log(temp)
    console.log("jASDFGHJJHGHJJKJJHJKHGUI")
    // Now we send the file to S3 using our s3utils
    // 'name' is the text entered into the input field
    // and this is what the name of the file will be in s3
    var pics: string[] = []
    files.forEach(async (file) => {

      console.log("NAMEMMMEJNNJKNJWIEFNWJIN")
      console.log(req.body.name)
      const name = String(req.body.name);
      pics.push(name)
      temparr.push(name)
      const result = await s3utils.uploadFile(file, name)
    })
    console.log("thIS ISnEW  TEMPADR")
    console.log(temparr)
    console.log("jgnerngiwnj rjiegnij")
    console.log(pics)
    console.log("AHHHHHHHHHHHHHHBEWFJHBWFUBWEBEBFWBWFIWNS")
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

    //console.log(result)
    // Now we delete the file from the /uploads folder since it has been uploaded
    // await fs.unlink(file.path);
    // Here you can return anything, I'm choosing to return the path to the image
    res.send(successJson({}));

  } catch (error) {
    res.send(errorJson(error));

    // res.status(200).json({ id: id })
  }
}
const getListingPicture = async (req, res) => {
  const { id } = req.params
  const response = s3utils.getFileStream(id)
  if (response) {
    response.createReadStream().on('error', e => {
      console.log(e);
    }).pipe(res);
  }
  console.log("PIPE2wnfwoifniwono")
  console.log("PIPE1")
  //response.pipe(res)
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
  getListingByCategory,
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  updateListingPicture,
  getListingPicture
}