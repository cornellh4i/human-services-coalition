const mongoose = require("mongoose");

require("dotenv").config(({ path: "config.env" }));
const ATLAS_URI = process.env.ATLAS_URI;
 
module.exports = {
    connectToServer: function () {
      mongoose.connect(ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
};