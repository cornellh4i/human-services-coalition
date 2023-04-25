module.exports = () => {
  const express = require("express");
  const router = express.Router();
  const passport = require('passport');
  const jwt = require('jsonwebtoken');


  const {
    getListings,
    getListing,
    getListingByCategory
  } = require("./controllers/listingController")

  const {
    getUsers,
    getUser
  } = require("./controllers/userController")

  const {
    getAdmin,
    getAdmins
  } = require("./controllers/adminController")

  /**** Routes ****/

  // GET all housing listings
  router.get('/listing', getListings)

  //GET housing listing by category and value
  router.get('/listingsByCategory', getListingByCategory);

  // GET a specific housing listing (by id)
  router.get('/listing/:id', getListing)


  // GET all users
  router.get('/users', getUsers)

  // GET a specific user
  router.get('/users/:id', getUser)


  // GET all admins
  router.get('/admins', getAdmins)

  // GET a specific admin
  router.get('/admins/:id', getAdmin)


  // LOGIN
  router.post(
    '/login',
    async (req, res, next) => {
      passport.authenticate(
        'login',
        async (err, account, account_type, info) => {
          try {
            if (err || !account) {
              const error = new Error('An error occurred.');
  
              return next(error);
            }
  
            req.login(
              account,
              { session: false },
              async (error) => {
                if (error) return next(error);
  
                const body = {type: account_type, _id: account._id, username: account.username };
                const token = jwt.sign({ account: body }, 'TOP_SECRET');
  
                return res.json({ token });
              }
            );
          } catch (error) {
            return next(error);
          }
        }
      )(req, res, next);
    }
  );

  return router;
}