import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ListingPage.module.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../apiUrl.js";

const ListingPage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/all-users`);
        // console.log(response.data);
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [token]);

  const handleViewAll = (userId) => {
    navigate(`/users/${userId}/videos`);
    // console.log(`View all videos for user ID: ${userId}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Listing Page</h2>
      {users.map((user) => (
        <div key={user.id} className={styles.userCard}>
          <div className={styles.userInfo}>
            <img
              src={`${API_URL}/${user.profilePicture}`}
              alt="Profile"
              className={styles.profilePic}
            />
            <h3>
              {user.firstName}
              <br />
              {user.lastName}
            </h3>
            <div>
              <h3 className={styles.username}>{user.username}</h3>
              <div className={styles.videos}>
                {user.videos.slice(0, 5).map((video, index) => (
                  <video
                    key={index}
                    src={`${API_URL}/${video.videoPath}`}
                    controls
                    className={styles.video}
                  />
                ))}
              </div>
            </div>
          </div>
          <button
            className={styles.viewAllButton}
            onClick={() => handleViewAll(user.id)}
          >
            View All
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListingPage;
