const express = require("express");
const {err_db} = require("./dbConnections");
const dotenv = require("dotenv");
const path = require("path");
const erpCollectionRoutes = require("./routes/erp_collection_routes");
const cors = require("cors"); // Import the cors package
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
console.log("__dirname", path.join(__dirname, "../downloads"));
app.use("/downloads", express.static(path.join(__dirname, "../downloads")));

// MongoDB connection


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
