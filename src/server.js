const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const erpCollectionRoutes = require("./routes/erp_collection_routes");
const cors = require("cors"); // Import the cors package

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  res.send("Welcome to the ERP Collection API");
});
// Routes
app.use("/api/erp-collections", erpCollectionRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
