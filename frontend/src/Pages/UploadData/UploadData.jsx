import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./UploadData.module.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../apiUrl.js";

const API_BASE_URL = "api/users";

const UploadData = () => {
  const navigate = useNavigate();

  // User data that will be displayed after login
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    profilePicture: "",
    videos: [
      {
        title: "",
        description: "",
        videoPath: "",
      },
    ],
  });

  const [profilePic, setProfilePic] = useState(null);

  const [bio, setBio] = useState("");
  const [isBioPopUpOpen, setIsBioPopUpOpen] = useState(false);

  const [videos, setVideos] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
    videoFile: null,
  });
  const [isVideoPopUpOpen, setIsVideoPopUpOpen] = useState(false);

  // This token will be passed in header which will be verified on the backend
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    //   retriving the data
    const getData = async () => {
      const response = await axios.get(
        `${API_URL}/${API_BASE_URL}/user-data`, // backend API integration - user data
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token here
          },
        }
      );
      // console.log(response.data);
      setUserData(response.data);
      setProfilePic(response.data.profilePicture);
      setVideos(response.data.videos);
      // setVideoDetails(response.data.videos.videoPath);
    };
    getData();
  }, [token]);

  // Upload Profile Picture
  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed for profile pictures.");
        e.target.value = "";
        return;
      }
      if (file.size > 1 * 1024 * 1024) {
        alert("Profile picture must be smaller than 1MB.");
        e.target.value = "";
        return;
      }

      const formData = new FormData();
      formData.append("profilePic", file);

      try {
        const response = await axios.post(
          // backend API integration - Profile pic
          `${API_URL}/${API_BASE_URL}/profile-pic`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfilePic(response.data.user.profilePicture);
        alert("Profile picture uploaded successfully.");
      } catch (error) {
        alert(
          error.response?.data?.message || "Failed to upload profile picture."
        );
      }
    }
  };

  // Add Bio
  const handleSaveBio = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/${API_BASE_URL}/bio`,
        { bio },
        {
          // backend API integration - bio
          headers: {
            Authorization: `Bearer ${token}`, // Add the token here
          },
        }
      );

      alert("Bio updated successfully.");
      setBio(response.data.user.bio);
      setIsBioPopUpOpen(false);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update bio.");
    }
  };

  const handleUploadVideoClick = () => setIsVideoPopUpOpen(true);

  const handleCancelVideoUpload = () => setIsVideoPopUpOpen(false);

  // Upload Video
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "video/mp4") {
        alert("Only .mp4 files are allowed.");
        e.target.value = "";
        return;
      }
      if (file.size > 6 * 1024 * 1024) {
        alert("Video file must be smaller than 6MB.");
        e.target.value = "";
        return;
      }
      setVideoDetails({ ...videoDetails, videoFile: file });
    }
  };

  const handleUploadVideo = async () => {
    if (
      !videoDetails.title ||
      !videoDetails.description ||
      !videoDetails.videoFile
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", videoDetails.title);
    formData.append("description", videoDetails.description);
    formData.append("videoFile", videoDetails.videoFile);

    setIsUploading(true);
    try {
      const response = await axios.post(
        // backend API integration - video
        `${API_URL}/${API_BASE_URL}/video`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVideos(response.data.user.videos);
      alert("Video uploaded successfully.");
      setIsVideoPopUpOpen(false);
      setVideoDetails({ title: "", description: "", videoFile: null });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to upload video.");
    } finally {
      setIsUploading(false);
    }
  };

  // Loading
  if (isUploading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <button
        className={styles.listingPageButton}
        onClick={() => navigate("/listing")}
      >
        Listing Page
      </button>
      <div className={styles.card}>
        <h2 className={styles.heading}>Upload Data</h2>
        <div className={styles.formRow}>
          <div className={styles.upload}>
            <label className={styles.label}>Profile Picture</label>
            <input
              type="file"
              onChange={handleProfilePicChange}
              accept="image/*"
            />
            {profilePic && (
              <img
                src={`${API_URL}/${profilePic}`}
                alt="Profile"
                className={styles.profilePic}
              />
            )}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>First Name</label>
            <input
              type="text"
              className={styles.input}
              value={userData.firstName}
              readOnly
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Last Name</label>
            <input
              type="text"
              className={styles.input}
              value={userData.lastName}
              readOnly
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              type="text"
              className={styles.input}
              value={userData.email}
              readOnly
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Phone Number</label>
            <input
              type="text"
              className={styles.input}
              value={userData.phone}
              readOnly
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Bio</label>
            <textarea
              className={styles.textarea}
              value={userData.bio || "No bio added yet."}
              readOnly
            />
          </div>
          <button
            className={styles.button}
            onClick={() => setIsBioPopUpOpen(true)}
          >
            Add Bio
          </button>
        </div>
      </div>

      {isBioPopUpOpen && (
        <div className={styles.popUpContainer}>
          <div className={styles.popUp}>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={500}
              placeholder="Add your bio here..."
            />
            <div className={styles.popupButtons}>
              <button className={styles.button} onClick={handleSaveBio}>
                Save
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setIsBioPopUpOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.card}>
        <h2 className={styles.heading}>Uploaded Videos</h2>
        <button className={styles.button} onClick={handleUploadVideoClick}>
          Upload Video
        </button>
        {isUploading && <div className={styles.loader}></div>}
        <div className={styles.videoList}>
          {videos.map((video, index) => (
            <div key={index} className={styles.videoCard}>
              <h4>{video.title}</h4>
              <p>{video.description}</p>
              <video controls width="200" height="200">
                <source
                  src={`${API_URL}/${video.videoPath}`}
                  type="video/mp4"
                />
              </video>
            </div>
          ))}
        </div>
      </div>

      {isVideoPopUpOpen && (
        <div className={styles.popUpVideo}>
          <div className={styles.videoForm}>
            <input
              type="text"
              placeholder="Title (max 30 words)"
              maxLength={30}
              value={videoDetails.title}
              onChange={(e) =>
                setVideoDetails({ ...videoDetails, title: e.target.value })
              }
            />
            <textarea
              placeholder="Description (max 120 words)"
              maxLength={120}
              value={videoDetails.description}
              onChange={(e) =>
                setVideoDetails({
                  ...videoDetails,
                  description: e.target.value,
                })
              }
            />
            <input type="file" accept=".mp4" onChange={handleVideoChange} />
            <div className={styles.popupButtons}>
              <button className={styles.button} onClick={handleUploadVideo}>
                Upload
              </button>
              <button
                className={styles.cancelButton}
                onClick={handleCancelVideoUpload}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadData;
