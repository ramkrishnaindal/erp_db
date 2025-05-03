const mongoose = require("mongoose");

const ErpCollection = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    author_name: {
      type: String,
      required: false,
    },
    source_name: {
      type: String,
      required: false,
    },
    article_date: {
      type: String, // Keeping it as a string to match the format "5 April, 2025"
      required: false,
    },
    topic_date: {
      type: String, // Keeping it as a string to match the format "5 April, 2025"
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
    thumbnail_url: {
      type: String,
      required: false,
    },
    version_name: {
      type: String,
      required: false,
    },
    release_date: {
      type: String,
      required: false,
    },
    release_notes: {
      type: String,
      required: false,
    },
    event_type: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    event_name: {
      type: String,
      required: false,
    },
    start_date: {
      type: String,
      required: false,
    },
    end_date: {
      type: String,
      required: false,
    },

    error: {
      type: Boolean,
      required: false,
    },
    tags: {
      type: String, // Assuming tags are stored as a comma-separated string
      required: false,
    },
    software_name: {
      type: String,
      required: true,
    },
    domain_name: {
      type: String,
      required: true,
    },
    topic_type: {
      type: String,
      required: true,
    },
    extracted_at: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "erp_collection" }
);

module.exports = mongoose.model("erp_collection", ErpCollection);
