const mongoose = require("mongoose");
let interval;
let err_db = null;
let connErpdb,connJobsdb; 

mongoose.createConnection(process.env.MONGO_URI)
  .then((connection) => {
    connErpdb = connection;
    console.log("Connected to MongoDB");
    if (interval) clearInterval(interval);
    err_db = null;
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    err_db = err;
    if (err_db) {
      if (interval) {
        clearInterval(interval);
      } else {
        interval = setInterval(() => {
          mongoose.createConnection(process.env.MONGO_URI)
            .then((connection) => {
              connErpdb = connection;
              console.log("Connected to MongoDB");
              if (interval) clearInterval(interval);
              err_db = null;
            })
            .catch((err) => {
              console.error("MongoDB connection error:", err);
              err_db = err;
            });
        }, 10000);
      }
    } else {
      if (interval) clearInterval(interval);
    }
  });
mongoose.createConnection(process.env.MONGO_JOBS_URI)
  .then((connection) => {
    connJobsdb = connection;
    console.log("Connected to MongoDB");
    if (interval) clearInterval(interval);
    err_db = null;
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    err_db = err;
    if (err_db) {
      if (interval) {
        clearInterval(interval);
      } else {
        interval = setInterval(() => {
          mongoose.createConnection(process.env.MONGO_JOBS_URI)
            .then((connection) => {
              connJobsdb = connection;
              console.log("Connected to MongoDB");
              if (interval) clearInterval(interval);
              err_db = null;
            })
            .catch((err) => {
              console.error("MongoDB connection error:", err);
              err_db = err;
            });
        }, 10000);
      }
    } else {
      if (interval) clearInterval(interval);
    }
  });
module.exports = { connErpdb, connJobsdb,err_db };