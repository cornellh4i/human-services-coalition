const Listing = require("../models/Listing");
import mongoose from 'mongoose';
import multer from 'multer';
// const multer = require('multer');
// const multerS3 = require('multer-s3');
const fs = require('fs').promises;
import s3utils from '../utils/s3';

import { successJson, errorJson } from '../utils/jsonResponses';
import { TIMEOUT } from 'dns';

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
    const listing = await Listing.findOneAndUpdate({ _id: id }, {
      ...req.body
    })
    if (!listing) {
      return res.status(400).json({ error: 'No such listing' })
    }

    res.status(200).json({ id: id })
    //res.status(200).json({ id: listing._id })

  } catch (error) {
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


  try {

    const files = req.files;
    console.log("YOU THINK WE GOT THE FILE ? ")
    console.log(files)
    console.log("THE PARAMS")
    console.log(req.params)
    console.log(!files)
    console.log("before id")
    // We should check if the file exists, if it doesn't, return an error
    if (!files) {
      console.log("APPARENTLT WHERE HERE")
      res.send(errorJson("No file uploaded"));
      return;
    }

    //console.log(req.body)
    var temparr: string[] = req.body.arr

    // if (temparr[0] == "") {
    //   temparr = []
    // }


    // Now we send the file to S3 using our s3utils
    // 'name' is the text entered into the input field
    // and this is what the name of the file will be in s3
    console.log("before loop")
    files.forEach(async (file) => {
      console.log(req.body.name)
      const dirname = String(req.body.dirname)
      console.log("dir")
      console.log(dirname)
      const filename1 = String(req.body.filename)
      console.log("THIS IS FILENAME")
      console.log(filename1)

      //temparr.push(filename1)
      console.log("What is temparr?")
      console.log(temparr)
      const result = await s3utils.uploadFile(dirname, filename1, file, true)
      await fs.unlink(file.path);
    })
    console.log("exit loop")
    console.log(temparr)
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
    console.log("We in the error ")
    console.log(error)
    res.send(errorJson(error));

    // res.status(200).json({ id: id })
  }
}
const getListingPicture = async (req, res) => {
  console.log("INSIDE OF GETTING PICTURES")
  console.log("INSIDE OF GETTING PICTURES")
  const { dir } = req.params
  const { file } = req.params
  console.log("THE PARAMS")
  console.log(req.params)

  const dirname = String(dir)
  console.log("dirname" + dir)
  console.log("filename " + file)
  const filename1 = String(file)
  const filename2 = `${dirname}/${filename1}`;
  console.log("LOOOOOKS AT THE FILES")
  console.log(filename2)

  const response = s3utils.getFileStream(dirname, filename1)
  console.log('response iss')
  //console.log(response)
  if (response) {
    console.log("into readstre ")
    response.createReadStream().on('error', e => {
      console.log("This is errororrroorrooror")
      console.log(e);
    }).pipe(res);
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
  getListingByCategory,
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  updateListingPicture,
  getListingPicture
}