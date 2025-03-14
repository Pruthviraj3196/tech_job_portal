const userModel = require("../model/jobs");

const createJob = async (req, res) => {
  try {
    
       
    const {title, company, location, jobType, salary, description} = req.body;

    const header = req.headers;
    console.log(header);
    
    if(!header.authorization){
        res.json({
            message: "Please sign In" 
        })
    }

        
    const newCreatedJob = new userModel({title, company, location, jobType, salary, description});

    const newAddedJob = await newCreatedJob.save();

    res.json({
        message: "Job Created Successfully"
    })

  } catch (error) {
    console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
  }
};

const viewJob = async (req,res) => {
try {
    
    const header = req.headers;
    console.log(header);
    
    if(!header.authorization){
        res.json({
            message: "Please sign In"
        })
    } 

    const getAllJobs = await userModel.find();

    res.json({
        message: "Get all job Listed",
        getAllJobs, 
    }) 
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
}
};

const editJob = async (req, res) => {

try {
    const header = req.headers;
    console.log(header);
    
    if(!header.authorization){
        res.json({
            message: "Please sign In"
        })
    }

    const { jobId } = req.params;
    const updateData = req.body;

    if (!jobId) {
        return res.status(400).json({
            message: "Job ID is required"
        });
    }
    
    const updatedJob = await userModel.findByIdAndUpdate(jobId, updateData, { new: true });
    
    if (!updatedJob) {
        return res.status(404).json({
            message: "Job not found"
        });
    }
 
    res.json({
        message: "Job Edited Successfully"
    })
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
}
};

const deleteJob = async (req, res) => {

    const header = req.headers;
    console.log(header);
    
    if(!header.authorization){
        res.json({
            message: "Please sign In"
        })
    }

    const { jobId } = req.params;

    if (!jobId) {
        return res.status(400).json({
            message: "Job ID is required" 
        });
    }

    const deletedJob = await userModel.findByIdAndDelete(jobId);

    if (!deletedJob) {
        return res.status(404).json({
            message: "Job not found"
        });
    }

    res.json({
        message: "Job Deleted Successfully"
    })
};

const jobController = {
    createJob,
    viewJob,
    editJob,
    deleteJob,
}

module.exports = jobController;