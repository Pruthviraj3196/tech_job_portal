import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Box,
} from "@mui/material";

const EditJobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    salary: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please log in to edit jobs");
      return;
    }

    try {
      const response = await axios.get(
        `/api/v1/viewjob/`,
        {
          headers: { Authorization: ` ${token}` },
        }
      );

      const foundJob = response.data.getAllJobs.find(
        (job) => job._id === jobId
      );
      if (foundJob) {
        setJob(foundJob);
      } else {
        setMessage("Job not found");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please log in to edit jobs");
      return;
    }

    try {
      const response = await axios.put(
        `/api/v1/editjob/${jobId}`,
        job,
        {
          headers: { Authorization: `${token}` },
        }
      );

      setMessage(response.data.message);
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update job");
    }
  };

  return (
    <Container
      sx={{ maxWidth: "150px", width: "40%", margin: "auto", padding: "12px" }}
    >
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Edit Job
        </Typography>

        {message && (
          <Alert severity="info" sx={{ marginBottom: 2 }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Job Title"
            name="title"
            value={job.title}
            onChange={handleChange}
            margin="dense"
            required
            size="small"
          />
          <TextField
            fullWidth
            label="Company"
            name="company"
            value={job.company}
            onChange={handleChange}
            margin="dense"
            required
            size="small"
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={job.location}
            onChange={handleChange}
            margin="dense"
            required
            size="small"
          />
          <TextField
            fullWidth
            label="Job Type"
            name="jobType"
            value={job.jobType}
            onChange={handleChange}
            margin="dense"
            required
            size="small"
          />
          <TextField
            fullWidth
            label="Salary"
            name="salary"
            type="number"
            value={job.salary}
            onChange={handleChange}
            margin="dense"
            required
            size="small"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={job.description}
            onChange={handleChange}
            margin="dense"
            required
            multiline
            rows={3}
            size="small"
          />

          <Box mt={2} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              sx={{
                padding: "4px 12px",
                fontSize: "0.75rem",
                minWidth: "120px",
              }}
            >
              Update Job
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default EditJobPage;
