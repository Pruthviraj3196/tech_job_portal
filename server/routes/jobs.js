const express = require("express");
const jobController = require("../controllers/jobs");
 
const router = express.Router();
 
router.post("/createjob",jobController.createJob);
router.get("/viewjob", jobController.viewJob);
router.put("/editjob/:jobId", jobController.editJob);
router.delete("/deletejob/:jobId", jobController.deleteJob);


module.exports = router;