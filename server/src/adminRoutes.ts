module.exports = () => {
  const express = require("express");
  const router = express.Router();

  const {
    createListing,
    updateListing,
    deleteListing,
  } = require("./controllers/listingController")

  const {
    createUser,
    updateUser,
    deleteUser,
  } = require("./controllers/userController")

  const {
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
  // POST (add) a new housing listing
  router.post('/listing', createListing)

  // PATCH (edit) a specific housing listing
  router.patch('/listing/:id', updateListing)

  // DELETE a specific housing listing
  router.delete('/listing/:id', deleteListing)


  // POST (add) a new user
  router.post('/users', createUser)

  // PATCH (edit) a specific user
  router.patch('/users/:id', updateUser)

  // DELETE a specific user
  router.delete('/users/:id', deleteUser)


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