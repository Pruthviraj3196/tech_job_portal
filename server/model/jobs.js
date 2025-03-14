const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
   
    title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      jobType: {
        type: String,
        required: true,
      },
      salary: {
        type: Number,
      },
      description: {
        type: String,
        required: true,
      },
});

const jobModel = mongoose.model("jobs", jobSchema);

module.exports = jobModel;