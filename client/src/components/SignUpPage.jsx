import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";

const SignUpPage = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/v1/signup", user);
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage(error?.response?.data?.message || "Error signing up");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        {message && <Alert severity="info">{message}</Alert>}
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          variant="outlined"
          name="name"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          variant="outlined"
          name="email"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          variant="outlined"
          name="password"
          onChange={handleChange}
        />
        <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
          Sign Up
        </Button>
        <Button fullWidth variant="text" sx={{ mt: 1 }} onClick={() => navigate("/login")}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default SignUpPage;
