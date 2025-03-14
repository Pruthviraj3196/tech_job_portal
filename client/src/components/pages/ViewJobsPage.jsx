import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box, 
  Paper,
  Alert,
} from "@mui/material";

const ViewJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please log in to view jobs");
      return;
    }
    try {
      const response = await axios.get("http://localhost:4000/api/v1/viewjob", {
        headers: { Authorization: `${token}` },
      });
      setJobs(response.data.getAllJobs);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (jobId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please log in to delete jobs");
      return;
    }
    try {
      await axios.delete(`http://localhost:4000/api/v1/deletejob/${jobId}`, {
        headers: { Authorization: `${token}` },
      });
      setJobs(jobs.filter((job) => job._id !== jobId));
      setMessage("Job deleted successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete job");
    }
  };

  const handleEdit = (jobId) => {
    navigate(`/edit-job/${jobId}`);
  };

  const handleCreateJob = () => {
    navigate("/create-job");
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
        <Typography variant="h4">Job Listings</Typography>
        <Button variant="contained" color="primary" onClick={handleCreateJob}>
          Create Job
        </Button>
      </Box>
      {message && <Alert severity="info">{message}</Alert>}
      <List>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Paper key={job._id} sx={{ padding: 2, marginBottom: 2 }}>
  <ListItem alignItems="flex-start">
    <ListItemText
      primary={
        <Typography variant="h6" fontWeight="bold">
          {job.title}
        </Typography>
      }
      secondary={
        <>
          <Typography variant="body2"><strong>Company:</strong> {job.company}</Typography>
          <Typography variant="body2"><strong>Location:</strong> {job.location}</Typography>
          <Typography variant="body2"><strong>Type:</strong> {job.jobType}</Typography>
          <Typography variant="body2"><strong>Salary:</strong> {job.salary}</Typography>
          <Typography variant="body2"><strong>Description:</strong> {job.description}</Typography>
        </>
      }
    />
  </ListItem>
  {/* Buttons Container */}
  <Box display="flex" justifyContent="flex-end" gap={1} mt={1}>
    <Button variant="contained" color="primary" size="small" onClick={() => handleEdit(job._id)}>
      Edit
    </Button>
    <Button variant="contained" color="error" size="small" onClick={() => handleDelete(job._id)}>
      Delete
    </Button>
  </Box>
</Paper>

          ))
        ) : (
          <Typography>No jobs found.</Typography>
        )}
      </List>
    </Container>
  );
};

export default ViewJobsPage;
