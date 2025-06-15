const mongoose = require("mongoose");
let interval;
let err_db = null;
let connErpdb;
let connJobsdb;
const dotenv = require("dotenv");
dotenv.config();
try {
  connJobsdb = mongoose.createConnection(process.env.MONGO_URI)
} catch (error) {
  console.error("MongoDB connection error:", error);
  err_db = err;
  if (err_db) {
    if (interval) {
      clearInterval(interval);
    } else {
      interval = setInterval(() => {
        try {
          connJobsdb = mongoose.createConnection(process.env.MONGO_URI)
          console.log("Connected to MongoDB");
          if (interval) clearInterval(interval);
          err_db = null;
        } catch (error) {
          console.error("MongoDB connection error:", err);
          err_db = err;
        }
      }, 10000);
    }
  } else {
    if (interval) clearInterval(interval);
  }
}
try {
  connJobsdb = mongoose.createConnection(process.env.MONGO_JOBS_URI)
} catch (error) {
  console.error("MongoDB connection error:", error);
  err_db = err;
  if (err_db) {
    if (interval) {
      clearInterval(interval);
    } else {
      interval = setInterval(() => {
        try {
          connJobsdb = mongoose.createConnection(process.env.MONGO_JOBS_URI)
          console.log("Connected to MongoDB");
          if (interval) clearInterval(interval);
          err_db = null;
        } catch (error) {
          console.error("MongoDB connection error:", err);
          err_db = err;
        }
      }, 10000);
    }
  } else {
    if (interval) clearInterval(interval);
  }
}
module.exports = {
  connErpdb, 
  connJobsdb,
  err_db
};