import express from 'express';
import UserController from './user.controller.js';
import { upload } from '../../middlewares/upload.middleware.js';
import authMiddleware from '../../middlewares/jwt.middleware.js';

const userRouter = express.Router();

const userController = new UserController();

// API endpoint
userRouter.post('/create-account', userController.signUp);
userRouter.post('/login', userController.signIn);

userRouter.post("/profile-pic", authMiddleware, upload.single("profilePic"), userController.uploadProfilePic);
userRouter.post("/bio", authMiddleware, userController.addBio);
userRouter.post("/video", authMiddleware, upload.single("videoFile"), userController.uploadVideo);
userRouter.get("/user-data", authMiddleware, userController.getUserData);

userRouter.get("/all-users", userController.getAllUsers);

userRouter.get("/:userId/videos", userController.getUserAllVideos);

export default userRouter;