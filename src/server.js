const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const erpCollectionRoutes = require("./routes/erp_collection_routes");
const cors = require("cors"); // Import the cors package
let interval;
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
let err_db;
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
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
          mongoose
            .connect(process.env.MONGO_URI)
            .then(() => {
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

app.get("/", (req, res) => {
  if (err_db) {
    console.error("MongoDB connection error:", err_db);
    return res
      .status(500)
      .json({ message: "Database connection error", error: err_db });
  }
  res.send("Welcome to the ERP Collection API");
});
// Routes
app.use("/api/erp-collections", erpCollectionRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
