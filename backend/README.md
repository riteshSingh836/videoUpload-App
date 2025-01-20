User Management System

A full-stack application that enables users to:

Create accounts and log in securely.

Upload profile pictures, videos, and bio information.

Manage their data via a responsive and intuitive user interface.

View uploaded content in a listing format.



---

Features

1. Create Account

Allows users to register by providing essential details such as email, password, and other profile information.

Upon successful registration, the user can log in to access the platform.


2. Login

Users can log in securely using their registered email and password.

Upon successful login, a JWT token is generated and stored in the browser's local storage for authentication.


3. Upload Data Page

Enables users to manage their profile and upload additional data.

Features include:

Uploading and updating a profile picture.

Adding a bio.

Uploading videos with a title and description.

Viewing previously uploaded videos.



Pop-Ups:

Bio Pop-Up:

Add or update bio information via a modal pop-up.

Maximum length: 500 characters.


Video Upload Pop-Up:

Add a video file (.mp4 format only) with a title (max 30 characters) and description (max 120 characters).



4. Listing Page

Displays all uploaded content in a list format.

Users can navigate to this page to view their uploaded videos and data.



---

Tech Stack

Frontend:

React.js: Component-based UI development.

CSS Modules: Modular styling for components.


Backend:

Node.js: Server-side scripting.

Express.js: Framework for building REST APIs.

MongoDB: Database for storing user and video data.

Mongoose: ODM for MongoDB.


Middleware:

JWT: For user authentication.

Multer: For handling file uploads.


API Endpoints

Authentication

1. Create Account: POST /api/users/create-account

Body: { email, password, ... }

Response: Success or failure message.



2. Login: POST /api/users/login

Body: { email, password }

Response: JWT token on success.




User Management

1. Get User Data: GET /api/users/user-data

Headers: { Authorization: Bearer <token> }

Response: User's profile data.



2. Upload Profile Picture: POST /api/users/profile-pic

Headers: { Authorization: Bearer <token> }

Body: multipart/form-data { profilePic }

Response: Updated user profile picture path.



3. Add Bio: POST /api/users/bio

Headers: { Authorization: Bearer <token> }

Body: { bio }

Response: Updated bio.



4. Upload Video: POST /api/users/video

Headers: { Authorization: Bearer <token> }

Body: multipart/form-data { title, description, videoFile }

Response: Updated user videos list.



5. Get All Videos: GET /api/users/:userId/videos

Response: List of all uploaded videos for the user.





---

Setup Instructions

1. Prerequisites:

Node.js: Installed on your machine.

MongoDB: Running locally or hosted.


2. Backend Setup:

1. Clone the repository and navigate to the backend folder.


2. Install dependencies:

npm install


3. Create a .env file and add the following:

PORT=5000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_secret_key>


4. Start the backend server:

npm start



3. Frontend Setup:

1. Navigate to the frontend folder.


2. Install dependencies:

npm install


3. Start the development server:

npm start




---

How to Use

1. Create an Account:

Open the app and navigate to the "Create Account" page.

Fill in your details and submit.



2. Log In:

Use your registered email and password to log in.



3. Upload Data:

Add or update your profile picture, bio, and videos.

Use the "Upload Video" button to add new video content.



4. View Content:

Navigate to the "Listing Page" to view your uploaded data.





---

Project Screenshots

Upload Data Page

Description of how the Upload Data page looks and its functionality.

Video Listing Page

Description of the Listing page.


---

Future Enhancements

1. Add user roles (e.g., Admin, User).


2. Implement video streaming optimization.


3. Integrate third-party storage (e.g., AWS S3) for uploaded files.