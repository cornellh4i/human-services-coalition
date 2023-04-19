import multer from 'multer';

module.exports = () => {
  const express = require("express");
  const router = express.Router();

  const {
    getListings,
    getListing,
    getListingByCategory,
    createListing,
    updateListing,
    deleteListing,
    updateListingPicture,
    getListingPicture
  } = require("./controllers/listingController")

  const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  } = require("./controllers/userController")

  const {
    getAdmin,
    getAdmins,
    createAdmin,
    deleteAdmin,
    updateAdmin
  } = require("./controllers/adminController")

  const {
    getFMRprices,
    createFMRprices,
    updateFMRprices,
    deleteFMRprices
  } = require("./controllers/fmrController")

  /**** Routes ****/

  // GET all housing listings
  router.get('/listing', getListings)

  //GET housing listing by category and value
  router.get('/listingsByCategory', getListingByCategory);

  // GET a specific housing listing (by id)
  router.get('/listing/:id', getListing)

  //GET the picture for a specific listing
  router.get('/listingPicture/:id', getListingPicture)

  // POST (add) a new housing listing
  router.post('/listing', createListing)

  const upload = multer({ dest: "uploads/" });
  // upload.single("pictures")
  //upload.array("pictures")

  // PATCH (edit) a specific housing listing
  router.patch('/listing/:id', updateListing)
  router.patch('/listingPicture/:id', upload.array("pictures"), updateListingPicture)

  // DELETE a specific housing listing
  router.delete('/listing/:id', deleteListing)

  // GET all users
  router.get('/users', getUsers)

  // GET a specific user
  router.get('/users/:id', getUser)

  // POST (add) a new user
  router.post('/users', createUser)

  // PATCH (edit) a specific user
  router.patch('/users/:id', updateUser)

  // DELETE a specific user
  router.delete('/users/:id', deleteUser)


  // GET all admins
  router.get('/admins', getAdmins)

  // GET a specific admin
  router.get('/admins/:id', getAdmin)

  // POST (add) a new admin
  router.post('/admins', createAdmin)

  // PATCH (edit) a specific admin
  router.patch('/admins/:id', updateAdmin)

  // DELETE a specific admin
  router.delete('/admins/:id', deleteAdmin)


  //GET all FMR prices
  router.get('/fmr', getFMRprices)

  // POST (add) FMR prices
  router.post('/fmr', createFMRprices)

  // PATCH (edit) FMR prices  
  router.patch('/fmr/:id', updateFMRprices)

  // DELETE FMR prices
  router.delete('/fmr/:id', deleteFMRprices)

  return router;
}

