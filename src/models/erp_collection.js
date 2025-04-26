const mongoose = require("mongoose");

const ErpCollection = new mongoose.Schema(
  {
    article_title: {
      type: String,
      required: false,
    },
    article_description: {
      type: String,
      required: false,
    },
    article_author: {
      type: String,
      required: false,
    },
    article_date: {
      type: String, // Keeping it as a string to match the format "5 April, 2025"
      required: false,
    },
    article_url: {
      type: String,
      required: false,
    },
    article_thumbnail_url: {
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
    description: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
    event_name: {
      type: String,
      required: false,
    },
    event_start_date: {
      type: String,
      required: false,
    },
    event_end_date: {
      type: String,
      required: false,
    },
    event_description: {
      type: String,
    },
    event_page_url: {
      type: String,
      required: false,
    },
    event_thumbnail_url: {
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
