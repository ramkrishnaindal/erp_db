const express = require("express");
const router = express.Router();
const ErpCollection = require("../models/erp_collection");

// Get all documents
router.post("/", async (req, res) => {
  try {
    const { software_name, domain_name, topic_type } = req.body;
    const domain = await ErpCollection.find({
      domain_name: {
        $regex: new RegExp("^" + domain_name.toLowerCase().trim(), "i"),
      },
      topic_type: {
        $regex: new RegExp("^" + topic_type.toLowerCase().trim(), "i"),
      },
    });
    let results = [];
    if (domain && domain.length) {
      results = domain.filter(
        (x) =>
          x.version_name?.trim().toLowerCase() ===
          software_name.trim().toLowerCase()
      );
      if (!results.length)
        results = domain.filter(
          (x) =>
            x.event_name?.trim().toLowerCase() ===
            software_name.trim().toLowerCase()
        );
      if (!results.length)
        results = domain.filter(
          (x) =>
            x.article_title?.trim().toLowerCase() ===
            software_name.trim().toLowerCase()
        );
      if (!results.length)
        results = domain.filter(
          (x) =>
            x.software_name.trim().toLowerCase() ===
            software_name.trim().toLowerCase()
        );
    }

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
