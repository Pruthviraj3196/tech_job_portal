import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const CreateJobPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    salary: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please log in to create a job");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/createjob",
        formData,
        {
          headers: { Authorization: `${token}` },
        }
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ p: 2, mt: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h5" gutterBottom>
          Create Job
        </Typography>
        {message && <Alert severity="info" sx={{ width: "100%", mb: 2 }}>{message}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField fullWidth size="small" margin="dense" label="Job Title" name="title" onChange={handleChange} required />
          <TextField fullWidth size="small" margin="dense" label="Company Name" name="company" onChange={handleChange} required />
          <TextField fullWidth size="small" margin="dense" label="Location" name="location" onChange={handleChange} required />
          <TextField fullWidth size="small" margin="dense" label="Job Type (Full-time, Part-time)" name="jobType" onChange={handleChange} required />
          <TextField fullWidth size="small" margin="dense" label="Salary" name="salary" type="number" onChange={handleChange} required />
          <TextField fullWidth size="small" margin="dense" label="Job Description" name="description" multiline rows={3} onChange={handleChange} required />
          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Create Job
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateJobPage;
