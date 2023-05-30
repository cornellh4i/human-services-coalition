import Express from "express";
/**** Node.js libraries *****/
const path = require('path');

/**** External libraries ****/
const express = require('express'); 
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

/**** Configuration ****/
const app = express(); 

function createServer() {
  const routes = require("./routes")();
  const adminRoutes = require('./adminRoutes')();

  app.use(passport.initialize());
  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('combined')); 
  app.use(cors());
  app.use(express.static(path.resolve('..', 'client', 'build'))); 
  
  /**** Add routes ****/
  app.use("/api", routes);

  // Plug in the JWT strategy as a middleware so only verified users can access this route.
  require("./auth");
  app.use('/api', passport.authenticate('jwt', { session: false }), adminRoutes);

  // "Redirect" all non-API GET requests to React's entry point (index.html)
  app.get('*', (req: Express.Request, res: Express.Response) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
  );
  
  return app;
}

module.exports = createServer;