const mongoose = require('mongoose');
const {connJobsdb} = require("./dbConnections");
const jobSchema = new mongoose.Schema({
  job_title: String,
  company_name: String,
  job_location: String,
  employment_type: String,
  salary_range: String,
  work_location_type: String,
  posted_date: String,
  apply_button_label: String,
  apply_url: String,
  seniority_level: String,
  job_id: String,
  industry: String,
  comp_desc: String,
  tech_skills: String,
  benefits: String,
  qualifications: String,
  full_job_description: String,
  c_logo: String,
  extract_date: Date,
  domain_name: String,
  software_name: String,
  contract_duration: String,
  expected_hours_per_week: String,
  required_skills: String,
  llm_converted: { type: Number, default: 0 },
  seen: { type: Boolean, default: false },
  search_id: String,
  active: { type: Boolean, default: true }
}, {
  timestamps: true,
  collection: 'jobdetails'  // explicitly specify the collection name
});
module.exports =  connJobsdb.model('JobDetail', jobSchema); // collection name is jobdetails
