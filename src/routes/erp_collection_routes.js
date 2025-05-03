const express = require("express");
const router = express.Router();
const ErpCollection = require("../models/erp_collection");
const isUrlValid = async (urlThumbnail) => {
  try {
    // Check if the URL is valid
    const response = await fetch(urlThumbnail);
    // Check if the response is successful
    if (!response.ok) {
      return false;
    }
    return true;
  } catch (err) {
    console.error("Error fetching URL:", err);
    // If the URL is not valid, return false
    return false;
  }
};
// Get all documents
router.post("/", async (req, res) => {
  try {
    const {
      software_name,
      domain_name,
      topic_type,
      page_num = 1,
      page_size = 9,
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
    results = results.map(async (result) => {
      // debugger;
      const isValid =
        !!result.thumbnail_url && (await isUrlValid(result.thumbnail_url));
      if (!isValid) {
        switch (result.topic_type) {
          case "bulletins":
            result.thumbnail_url =
              "https://easihub.com/uploads/default/original/1X/2ccdcf178cdc68df1432405245d6c0ebd48f136b.jpg";
            break;
          case "articles":
            result.thumbnail_url =
              "https://easihub.com/uploads/default/original/1X/0cfbded9a9b66d49a1245a2bd7023c8fd8217f5b.jpg";
            break;
          case "events":
            result.thumbnail_url =
              "https://easihub.com/uploads/default/original/1X/39d542ca6a6ba52650c772b7d120f9bd2e506231.jpg";
            break;
          case "Podcast":
            result.thumbnail_url =
              "https://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
            break;
        }
      }
      return { ...result };
    });
    results = await Promise.all(results);
    res.status(200).json(results.map((result) => result._doc));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/count", async (req, res) => {
  try {
    const { software_name, domain_name, topic_type } = req.body;
    let results = 0;
    results = await ErpCollection.countDocuments({
      domain_name: {
        $regex: new RegExp("^" + domain_name.toLowerCase().trim(), "i"),
      },
      topic_type: {
        $regex: new RegExp("^" + topic_type.toLowerCase().trim(), "i"),
      },
      software_name: {
        $regex: new RegExp("^" + software_name.toLowerCase().trim(), "i"),
      },
    });
    if (!results)
      results = await ErpCollection.countDocuments({
        domain_name: {
          $regex: new RegExp("^" + domain_name.toLowerCase().trim(), "i"),
        },
        topic_type: {
          $regex: new RegExp("^" + topic_type.toLowerCase().trim(), "i"),
        },
        version_name: {
          $regex: new RegExp("^" + software_name.toLowerCase().trim(), "i"),
        },
      });

    if (!results)
      results = await ErpCollection.countDocuments({
        domain_name: {
          $regex: new RegExp("^" + domain_name.toLowerCase().trim(), "i"),
        },
        topic_type: {
          $regex: new RegExp("^" + topic_type.toLowerCase().trim(), "i"),
        },
        event_name: {
          $regex: new RegExp("^" + software_name.toLowerCase().trim(), "i"),
        },
      });

    if (!results)
      results = await ErpCollection.countDocuments({
        domain_name: {
          $regex: new RegExp("^" + domain_name.toLowerCase().trim(), "i"),
        },
        topic_type: {
          $regex: new RegExp("^" + topic_type.toLowerCase().trim(), "i"),
        },
        article_title: {
          $regex: new RegExp("^" + software_name.toLowerCase().trim(), "i"),
        },
      });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
