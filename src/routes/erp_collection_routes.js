const express = require("express");
const router = express.Router();
const ErpCollection = require("../models/erp_collection");

// Get all documents
router.post("/", async (req, res) => {
  try {
    const {
      software_name,
      domain_name,
      topic_type,
      page_num = 1,
      page_size = 10,
    } = req.body;
    let results = [];
    results = await ErpCollection.find({
      domain_name: {
        $regex: new RegExp("^" + domain_name.toLowerCase().trim(), "i"),
      },
      topic_type: {
        $regex: new RegExp("^" + topic_type.toLowerCase().trim(), "i"),
      },
      software_name: {
        $regex: new RegExp("^" + software_name.toLowerCase().trim(), "i"),
      },
    })
      .skip((page_num - 1) * page_size)
      .limit(page_size);

    if (!results.length)
      results = await ErpCollection.find({
        domain_name: {
          $regex: new RegExp("^" + domain_name.toLowerCase().trim(), "i"),
        },
        topic_type: {
          $regex: new RegExp("^" + topic_type.toLowerCase().trim(), "i"),
        },
        version_name: {
          $regex: new RegExp("^" + software_name.toLowerCase().trim(), "i"),
        },
      })
        .skip((page_num - 1) * page_size)
        .limit(page_size);
    if (!results.length)
      results = await ErpCollection.find({
        domain_name: {
          $regex: new RegExp("^" + domain_name.toLowerCase().trim(), "i"),
        },
        topic_type: {
          $regex: new RegExp("^" + topic_type.toLowerCase().trim(), "i"),
        },
        event_name: {
          $regex: new RegExp("^" + software_name.toLowerCase().trim(), "i"),
        },
      })
        .skip((page_num - 1) * page_size)
        .limit(page_size);
    if (!results.length)
      results = await ErpCollection.find({
        domain_name: {
          $regex: new RegExp("^" + domain_name.toLowerCase().trim(), "i"),
        },
        topic_type: {
          $regex: new RegExp("^" + topic_type.toLowerCase().trim(), "i"),
        },
        article_title: {
          $regex: new RegExp("^" + software_name.toLowerCase().trim(), "i"),
        },
      })
        .skip((page_num - 1) * page_size)
        .limit(page_size);

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
