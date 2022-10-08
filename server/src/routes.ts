module.exports = () => {
  const express = require("express");
  const router = express.Router();

  const {
    getListings,
    getListing,
    createListing,
    updateListing,
    deleteListing,
  } = require("../controllers/listingController")

  const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  } = require("../controllers/userController")



  /**** Routes ****/

  // GET all housing listings
  router.get('/listing', getListings)

  // GET a specific housing listing (by id)
  router.get('/listing/:id', getListing)

  // POST (add) a new housing listing
  router.post('/listing', createListing)

  // PATCH (edit) a specific housing listing
  router.patch('/listing/:id', updateListing)

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
  router.get('/admins', async (req, res) => {
    res.json({ msg: "GET all admins" })
  })

  // GET a specific admin
  router.get('/admins/:id', async (req, res) => {
    res.json({ msg: "GET a specific admin" })
  })

  // POST (add) a new admin
  router.post('/admins', async (req, res) => {
    res.json({ msg: "POST (add) a new admin" })
  })

  // PATCH (edit) a specific admin
  router.patch('/admins/:id', async (req, res) => {
    res.json({ msg: "PATCH (edit) a specific admin" })
  })

  // DELETE a specific admin
  router.delete('/admins/:id', async (req, res) => {
    res.json({ msg: "DELETE a specific admin" })
  })

  return router;
}

