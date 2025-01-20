import React, { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../apiUrl.js";

const Login = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // To navigate to Upload Data Page
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages
    try {
      const response = await axios.post(`${API_URL}/api/users/login`, formData);

      // Storing JWT token in localstorage or cookies
      localStorage.setItem("authToken", response.data.token);

      alert(response.data.message); // Show a success message (or redirect based on your logic)
      navigate("/upload-data"); // Redirected to upload data Page.
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message); // Set error message from backend
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Login</h2>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
          required
        />
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
