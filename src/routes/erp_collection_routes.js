const express = require("express");

// const jobs = require("../../jobsSampleData.json");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../downloads")); // Save files to the downloads folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Add a unique suffix to the file name
  },
});
const upload = multer({ storage });
const ErpCollection = require("../models/erp_collection");
const JobDetail = require("../models/jobDetails"); // <-- Add this line
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
router.post("/jobs", async (req, res) => {
  try {
    const {
      software_name,
      domain_name,
      page_num = 1,
      page_size = 9,
    } = req.body;

    const filter = {
      software_name: { $regex: new RegExp("^" + software_name.trim(), "i") },
      domain_name: { $regex: new RegExp("^" + domain_name.trim(), "i") },
    };

    const results = await JobDetail.find(filter)
      .skip((page_num - 1) * page_size)
      .limit(page_size);

    return res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/jobs/details", async (req, res) => {
  try {
    const { _id } = req.body;
    const result = await JobDetail.findById(_id);
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/jobs/count", async (req, res) => {
  try {
    const { software_name, domain_name } = req.body;
    const filter = {
      software_name: { $regex: new RegExp("^" + software_name.trim(), "i") },
      domain_name: { $regex: new RegExp("^" + domain_name.trim(), "i") },
    };
    const count = await JobDetail.countDocuments(filter);
    return res.status(200).json(count);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Create the relative URL for the uploaded file
  const fileUrl = `${req.protocol}://${req.get("host")}/downloads/${
    req.file.filename
  }`;
  res.status(200).json({ message: "File uploaded successfully", fileUrl });
});

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
        try {
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
                software_name: {
                  $regex: new RegExp(
                    "^" + software_name.toLowerCase().trim(),
                    "i"
                  ),
                },
                release_date: { $ne: "" },
                source_name: {
                  $ne: "scribd.com",
                  // {
                  //   $regex: new RegExp("^scribd.com", "i"),
                  // },
                },
              },
            }, // Filter documents
            {
              $addFields: {
                release_date_as_date: { $toDate: "$release_date" }, // Convert string to Date
              },
            },
            { $sort: { release_date_as_date: -1 } }, // Sort by the converted date in descending order
            { $skip: (page_num - 1) * page_size }, // Pagination: Skip documents
            { $limit: page_size }, // Pagination: Limit the number of documents
          ]);
        } catch (error) {
          console.error("Error in aggregation:", error);
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
                software_name: {
                  $regex: new RegExp(
                    "^" + software_name.toLowerCase().trim(),
                    "i"
                  ),
                },
                release_date: { $ne: "" },
                source_name: {
                  $ne: "scribd.com",
                  // {
                  //   $regex: new RegExp("^scribd.com", "i"),
                  // },
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
        }

        if (!results.length)
          try {
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
                    $ne: "scribd.com",
                    // {
                    //   $regex: new RegExp("^scribd.com", "i"),
                    // },
                  },
                },
              }, // Filter documents
              {
                $addFields: {
                  release_date_as_date: { $toDate: "$release_date" }, // Convert string to Date
                },
              },
              { $sort: { release_date_as_date: -1 } }, // Sort by the converted date in descending order
              { $skip: (page_num - 1) * page_size }, // Pagination: Skip documents
              { $limit: page_size }, // Pagination: Limit the number of documents
            ]);
          } catch (error) {
            console.error("Error in fallback aggregation:", error);
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
                    $ne: "scribd.com",
                    // {
                    //   $regex: new RegExp("^scribd.com", "i"),
                    // },
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
          }

        break;
      case "articles":
        try {
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
                software_name: {
                  $regex: new RegExp(
                    "^" + software_name.toLowerCase().trim(),
                    "i"
                  ),
                },
                topic_date: { $ne: "" },
                source_name: {
                  $ne: "scribd.com",
                  // {
                  //   $regex: new RegExp("^scribd.com", "i"),
                  // },
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
        } catch (error) {
          console.error("Error in aggregation:", error);
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
                software_name: {
                  $regex: new RegExp(
                    "^" + software_name.toLowerCase().trim(),
                    "i"
                  ),
                },
                topic_date: { $ne: "" },
                source_name: {
                  $ne: "scribd.com",
                  // {
                  //   $regex: new RegExp("^scribd.com", "i"),
                  // },
                },
              },
            }, // Filter documents
            // {
            //   $addFields: {
            //     topic_date_as_date: { $toDate: "$topic_date" }, // Convert string to Date
            //   },
            // },
            // { $sort: { topic_date_as_date: -1 } }, // Sort by the converted date in descending order
            { $skip: (page_num - 1) * page_size }, // Pagination: Skip documents
            { $limit: page_size }, // Pagination: Limit the number of documents
          ]);
        }

        if (!results.length)
          try {
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
                    $ne: "scribd.com",
                    // {
                    //   $regex: new RegExp("^scribd.com", "i"),
                    // },
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
          } catch (error) {
            console.error("Error in fallback aggregation:", error);
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
                    $ne: "scribd.com",
                    // {
                    //   $regex: new RegExp("^scribd.com", "i"),
                    // },
                  },
                },
              }, // Filter documents
              // {
              //   $addFields: {
              //     topic_date_as_date: { $toDate: "$topic_date" }, // Convert string to Date
              //   },
              // },
              // { $sort: { topic_date_as_date: -1 } }, // Sort by the converted date in descending order
              { $skip: (page_num - 1) * page_size }, // Pagination: Skip documents
              { $limit: page_size }, // Pagination: Limit the number of documents
            ]);
          }

        break;
      case "events":
        try {
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
                software_name: {
                  $regex: new RegExp(
                    "^" + software_name.toLowerCase().trim(),
                    "i"
                  ),
                },
                start_date: { $ne: "" },
                start_date: { $ne: "TBD" },
                source_name: {
                  $ne: "scribd.com",
                  // {
                  //   $regex: new RegExp("^scribd.com", "i"),
                  // },
                },
              },
            }, // Filter documents
            {
              $addFields: {
                start_date_as_date: { $toDate: "$start_date" }, // Convert string to Date
              },
            },
            { $sort: { start_date_as_date: -1 } }, // Sort by the converted date in descending order
            { $skip: (page_num - 1) * page_size }, // Pagination: Skip documents
            { $limit: page_size }, // Pagination: Limit the number of documents
          ]);
        } catch (error) {
          console.error("Error in aggregation:", error);
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
                software_name: {
                  $regex: new RegExp(
                    "^" + software_name.toLowerCase().trim(),
                    "i"
                  ),
                },
                start_date: { $ne: "" },
                start_date: { $ne: "TBD" },
                source_name: {
                  $ne: "scribd.com",
                  // {
                  //   $regex: new RegExp("^scribd.com", "i"),
                  // },
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
        }

        if (!results.length)
          try {
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
                    $ne: "scribd.com",
                    // {
                    //   $regex: new RegExp("^scribd.com", "i"),
                    // },
                  },
                },
              }, // Filter documents
              {
                $addFields: {
                  start_date_as_date: { $toDate: "$start_date" }, // Convert string to Date
                },
              },
              { $sort: { start_date_as_date: -1 } }, // Sort by the converted date in descending order
              { $skip: (page_num - 1) * page_size }, // Pagination: Skip documents
              { $limit: page_size }, // Pagination: Limit the number of documents
            ]);
          } catch (error) {
            console.error("Error in fallback aggregation:", error);
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
                    $ne: "scribd.com",
                    // {
                    //   $regex: new RegExp("^scribd.com", "i"),
                    // },
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
          }

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
                $ne: "scribd.com",
                // {
                //   $regex: new RegExp("^scribd.com", "i"),
                // },
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
                  $ne: "scribd.com",
                  // {
                  //   $regex: new RegExp("^scribd.com", "i"),
                  // },
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
                $ne: "scribd.com",
                // {
                //   $regex: new RegExp("^scribd.com", "i"),
                // },
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
                  $ne: "scribd.com",
                  // {
                  //   $regex: new RegExp("^scribd.com", "i"),
                  // },
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
                $ne: "scribd.com",
                // {
                //   $regex: new RegExp("^scribd.com", "i"),
                // },
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
                  $ne: "scribd.com",
                  // {
                  //   $regex: new RegExp("^scribd.com", "i"),
                  // },
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
