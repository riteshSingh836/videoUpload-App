import React, { useState } from "react";
import axios from "axios";
import styles from "./CreateAccount.module.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../apiUrl.js";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // To navigate to login page
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post(
        `${API_URL}/api/users/create-account`,
        formData
      );
      alert(response.data.message);
      navigate("/login"); // Redirect to login page after successful account creation
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occured. Please try again.");
      }
      alert(errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Create Account</h2>
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
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Submit
        </button>
        <br />
        <button
          type="login"
          className={styles.btn}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <p className={styles.message}>Your information is safe with us!</p>
      </form>
    </div>
  );
};

export default CreateAccount;
