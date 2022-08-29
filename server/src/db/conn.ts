import { Db, MongoClient as MC, MongoError } from "mongodb";
import { Callback } from "mongoose";

const { MongoClient } = require("mongodb");
require("dotenv").config(({ path: "config.env" }));
const ATLAS_URI = process.env.ATLAS_URI;
const client = new MongoClient(ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db: Db;
 
module.exports = {
    connectToServer: function (callback: Callback) {
        client.connect(function (err: MongoError, db: MC) {
        // Verify we got a good "db" object
        if (db)
        {
            _db = db.db("CHANGE_TO_DATABASE_NAME");
            console.log("Successfully connected to MongoDB."); 
        }
        return callback(err, "Error in connecting to MongoDB");
            });
    },
 
  getDb: function () {
    return _db;
  },
};