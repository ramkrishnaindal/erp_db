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

    switch (topic_type.toLowerCase()) {
      case "bulletins":
        results = await ErpCollection.aggregate([
          {
            $match: {
              domain_name: {
                $regex: new RegExp("^" + domain_name.toLowerCase().trim(), "i"),
              },
              topic_type: {
                $regex: new RegExp("^" + topic_type.toLowerCase().trim(), "i"),
              },
              software_name: {
                $regex: new RegExp(
                  "^" + software_name.toLowerCase().trim(),
                  "i"
                ),
              },
              release_date: { $ne: "" },
              source_name: {
                $ne: {
                  $regex: new RegExp("^scribd.com", "i"),
                },
              },
            },
          }, // Filter documents
          // {
          //   $addFields: {
          //     release_date_as_date: { $toDate: "$release_date" }, // Convert string to Date
          //   },
          // },
          // { $sort: { release_date_as_date: -1 } }, // Sort by the converted date in descending order
          { $skip: (page_num - 1) * page_size }, // Pagination: Skip documents
          { $limit: page_size }, // Pagination: Limit the number of documents
        ]);
        if (!results.length)
          results = await ErpCollection.aggregate([
            {
              $match: {
                domain_name: {
                  $regex: new RegExp(
                    "^" + domain_name.toLowerCase().trim(),
                    "i"
                  ),
                },
                topic_type: {
                  $regex: new RegExp(
                    "^" + topic_type.toLowerCase().trim(),
                    "i"
                  ),
                },
                title: {
                  $regex: new RegExp(
                    "^" + software_name.toLowerCase().trim(),
                    "i"
                  ),
                },
                release_date: { $ne: "" },
                source_name: {
                  $ne: {
                    $regex: new RegExp("^scribd.com", "i"),
                  },
                },
              },
            }, // Filter documents
            // {
            //   $addFields: {
            //     release_date_as_date: { $toDate: "$release_date" }, // Convert string to Date
            //   },
            // },
            // { $sort: { release_date_as_date: -1 } }, // Sort by the converted date in descending order
            { $skip: (page_num - 1) * page_size }, // Pagination: Skip documents
            { $limit: page_size }, // Pagination: Limit the number of documents
          ]);
        break;
      case "articles":
        results = await ErpCollection.aggregate([
          {
            $match: {
              domain_name: {
                $regex: new RegExp("^" + domain_name.toLowerCase().trim(), "i"),
              },
              topic_type: {
                $regex: new RegExp("^" + topic_type.toLowerCase().trim(), "i"),
              },
              software_name: {
                $regex: new RegExp(
                  "^" + software_name.toLowerCase().trim(),
                  "i"
                ),
              },
              topic_date: { $ne: "" },
              source_name: {
                $ne: {
                  $regex: new RegExp("^scribd.com", "i"),
                },
              },
            },
          }, // Filter documents
          {
            $addFields: {
              topic_date_as_date: { $toDate: "$topic_date" }, // Convert string to Date
            },
          },
          { $sort: { topic_date_as_date: -1 } }, // Sort by the converted date in descending order
          { $skip: (page_num - 1) * page_size }, // Pagination: Skip documents
          { $limit: page_size }, // Pagination: Limit the number of documents
        ]);
        if (!results.length)
          results = await ErpCollection.aggregate([
            {
              $match: {
                domain_name: {
                  $regex: new RegExp(
                    "^" + domain_name.toLowerCase().trim(),
                    "i"
                  ),
                },
                topic_type: {
                  $regex: new RegExp(
                    "^" + topic_type.toLowerCase().trim(),
                    "i"
                  ),
                },
                title: {
                  $regex: new RegExp(
                    "^" + software_name.toLowerCase().trim(),
                    "i"
                  ),
                },
                topic_date: { $ne: "" },
                source_name: {
                  $ne: {
                    $regex: new RegExp("^scribd.com", "i"),
                  },
                },
              },
            }, // Filter documents
            {
              $addFields: {
                topic_date_as_date: { $toDate: "$topic_date" }, // Convert string to Date
              },
            },
            { $sort: { topic_date_as_date: -1 } }, // Sort by the converted date in descending order
            { $skip: (page_num - 1) * page_size }, // Pagination: Skip documents
            { $limit: page_size }, // Pagination: Limit the number of documents
          ]);
        break;
      case "events":
        results = await ErpCollection.aggregate([
          {
            $match: {
              domain_name: {
                $regex: new RegExp("^" + domain_name.toLowerCase().trim(), "i"),
              },
              topic_type: {
                $regex: new RegExp("^" + topic_type.toLowerCase().trim(), "i"),
              },
              software_name: {
                $regex: new RegExp(
                  "^" + software_name.toLowerCase().trim(),
                  "i"
                ),
              },
              start_date: { $ne: "" },
              start_date: { $ne: "TBD" },
              source_name: {
                $ne: {
                  $regex: new RegExp("^scribd.com", "i"),
                },
              },
            },
          }, // Filter documents
          // {
          //   $addFields: {
          //     start_date_as_date: { $toDate: "$start_date" }, // Convert string to Date
          //   },
          // },
          // { $sort: { start_date_as_date: -1 } }, // Sort by the converted date in descending order
          { $skip: (page_num - 1) * page_size }, // Pagination: Skip documents
          { $limit: page_size }, // Pagination: Limit the number of documents
        ]);
        if (!results.length)
          results = await ErpCollection.aggregate([
            {
              $match: {
                domain_name: {
                  $regex: new RegExp(
                    "^" + domain_name.toLowerCase().trim(),
                    "i"
                  ),
                },
                topic_type: {
                  $regex: new RegExp(
                    "^" + topic_type.toLowerCase().trim(),
                    "i"
                  ),
                },
                title: {
                  $regex: new RegExp(
                    "^" + software_name.toLowerCase().trim(),
                    "i"
                  ),
                },
                start_date: { $ne: "" },
                start_date: { $ne: "TBD" },
                source_name: {
                  $ne: {
                    $regex: new RegExp("^scribd.com", "i"),
                  },
                },
              },
            }, // Filter documents
            // {
            //   $addFields: {
            //     start_date_as_date: { $toDate: "$start_date" }, // Convert string to Date
            //   },
            // },
            // { $sort: { start_date_as_date: -1 } }, // Sort by the converted date in descending order
            { $skip: (page_num - 1) * page_size }, // Pagination: Skip documents
            { $limit: page_size }, // Pagination: Limit the number of documents
          ]);
        break;
    }

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
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/count", async (req, res) => {
  try {
    const { software_name, domain_name, topic_type } = req.body;
    let results = 0;
    switch (topic_type.toLowerCase()) {
      case "bulletins":
        results = await ErpCollection.aggregate([
          {
            $match: {
              domain_name: {
                $regex: new RegExp("^" + domain_name.toLowerCase().trim(), "i"),
              },
              topic_type: {
                $regex: new RegExp("^" + topic_type.toLowerCase().trim(), "i"),
              },
              software_name: {
                $regex: new RegExp(
                  "^" + software_name.toLowerCase().trim(),
                  "i"
                ),
              },
              release_date: { $ne: "" },
              source_name: {
                $ne: {
                  $regex: new RegExp("^scribd.com", "i"),
                },
              },
            },
          },
          { $count: "total" },
        ]);
        if (!results)
          results = await ErpCollection.aggregate([
            {
              $match: {
                domain_name: {
                  $regex: new RegExp(
                    "^" + domain_name.toLowerCase().trim(),
                    "i"
                  ),
                },
                topic_type: {
                  $regex: new RegExp(
                    "^" + topic_type.toLowerCase().trim(),
                    "i"
                  ),
                },
                title: {
                  $regex: new RegExp(
                    "^" + software_name.toLowerCase().trim(),
                    "i"
                  ),
                },
                release_date: { $ne: "" },
                source_name: {
                  $ne: {
                    $regex: new RegExp("^scribd.com", "i"),
                  },
                },
              },
            },
            { $count: "total" },
          ]);
        break;
      case "articles":
        results = await ErpCollection.aggregate([
          {
            $match: {
              domain_name: {
                $regex: new RegExp("^" + domain_name.toLowerCase().trim(), "i"),
              },
              topic_type: {
                $regex: new RegExp("^" + topic_type.toLowerCase().trim(), "i"),
              },
              software_name: {
                $regex: new RegExp(
                  "^" + software_name.toLowerCase().trim(),
                  "i"
                ),
              },
              topic_date: { $ne: "" },
              source_name: {
                $ne: {
                  $regex: new RegExp("^scribd.com", "i"),
                },
              },
            },
          },
          { $count: "total" },
        ]);
        if (!results)
          results = await ErpCollection.aggregate([
            {
              $match: {
                domain_name: {
                  $regex: new RegExp(
                    "^" + domain_name.toLowerCase().trim(),
                    "i"
                  ),
                },
                topic_type: {
                  $regex: new RegExp(
                    "^" + topic_type.toLowerCase().trim(),
                    "i"
                  ),
                },
                title: {
                  $regex: new RegExp(
                    "^" + software_name.toLowerCase().trim(),
                    "i"
                  ),
                },
                release_date: { $ne: "" },
                source_name: {
                  $ne: {
                    $regex: new RegExp("^scribd.com", "i"),
                  },
                },
              },
            },
            { $count: "total" },
          ]);
        break;
      case "events":
        results = await ErpCollection.aggregate([
          {
            $match: {
              domain_name: {
                $regex: new RegExp("^" + domain_name.toLowerCase().trim(), "i"),
              },
              topic_type: {
                $regex: new RegExp("^" + topic_type.toLowerCase().trim(), "i"),
              },
              software_name: {
                $regex: new RegExp(
                  "^" + software_name.toLowerCase().trim(),
                  "i"
                ),
              },
              start_date: { $ne: "" },
              start_date: { $ne: "TBD" },
              source_name: {
                $ne: {
                  $regex: new RegExp("^scribd.com", "i"),
                },
              },
            },
          },
          { $count: "total" },
        ]);
        if (!results)
          results = await ErpCollection.aggregate([
            {
              $match: {
                domain_name: {
                  $regex: new RegExp(
                    "^" + domain_name.toLowerCase().trim(),
                    "i"
                  ),
                },
                topic_type: {
                  $regex: new RegExp(
                    "^" + topic_type.toLowerCase().trim(),
                    "i"
                  ),
                },
                title: {
                  $regex: new RegExp(
                    "^" + software_name.toLowerCase().trim(),
                    "i"
                  ),
                },
                release_date: { $ne: "" },
                source_name: {
                  $ne: {
                    $regex: new RegExp("^scribd.com", "i"),
                  },
                },
              },
            },
            { $count: "total" },
          ]);
        break;
    }
    res.status(200).json(results[0]?.total || 0);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
