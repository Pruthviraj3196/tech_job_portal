import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/v1/login", user);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
        window.location.reload();
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      setMessage("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {message && <Alert severity="error">{message}</Alert>}
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
          Login
        </Button>
        <Button fullWidth variant="text" sx={{ mt: 1 }} onClick={() => navigate("/signup")}>
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;