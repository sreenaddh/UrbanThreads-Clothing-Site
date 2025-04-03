import React from "react";
import { Container, TextField, Button, Typography, Box, Card, CardContent, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Formik setup with Yup validation
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post('http://localhost:4000/signup', values);
        login(response.data.token);
        localStorage.setItem('token', response.data.token);
        console.log('Token after signup:', localStorage.getItem('token'));
        navigate('/');
      } catch (error) {
        console.error('There was an error submitting the form!', error);
        alert('Error submitting form');
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Card elevation={6} sx={{ borderRadius: 3 }}>
        <Grid container>
          <Grid item xs={6}>
            <img
              src="/images/login.jpg" // Replace with your image path
              alt="Sign Up"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={6}>
            <CardContent sx={{ alignItems: "center" }}>
              <Typography variant="h4" gutterBottom align="center">
                Sign Up
              </Typography>

              <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                {/* Name Field */}
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  margin="normal"
                  variant="outlined"
                />

                {/* Email Field */}
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  margin="normal"
                  variant="outlined"
                />

                {/* Password Field */}
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  margin="normal"
                  variant="outlined"
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="error" // Change to match Sign In color
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default Signup;
