import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./UserVideosPage.module.css";
import { API_URL } from "../../apiUrl.js";

const UserVideosPage = () => {
  const { userId } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/users/${userId}/videos`
        );
        setVideos(response.data.videos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user videos:", error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [userId]);

  if (loading) {
    return <div className={styles.loading}>Loading videos...</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>All Videos</h2>
      {videos.length > 0 ? (
        <div className={styles.videoGrid}>
          {videos.map((video, index) => (
            <video key={index} src={video} controls className={styles.video} />
          ))}
        </div>
      ) : (
        <p className={styles.noVideos}>No videos available for this user.</p>
      )}
    </div>
  );
};

export default UserVideosPage;
