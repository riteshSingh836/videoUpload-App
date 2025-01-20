import crypto from 'crypto'; // For password generation
import bcrypt from 'bcrypt'; // For hashing passwords
import sendEmail from '../../middlewares/sendEmail.middleware.js';
import UserRepository from './user.repository.js';
import { UserModel } from './user.schema.js';
import jwt from 'jsonwebtoken';

const userRepository = new UserRepository();

export default class UserController {

    // Creating an account
    async signUp(req,res,next) {
        const { firstName, lastName, email, phone } = req.body;
        try {
            // if email already exists
            const existingEmail = await UserModel.findOne({email});
            // console.log(existingEmail);
                if (existingEmail) {
                    return res.status(400).json({ message: "Email already exists. Please use a different email."})
                }
            // Password generation logic
            const generatePassword = (firstName, lastName, phone) => {
                return `${firstName.slice(0, 2)}${lastName.slice(0, 2)}${String(phone).slice(-4)}${crypto.randomInt(1000, 9999)}`;
            };
            // Generate password
            const password = generatePassword(firstName, lastName, phone);
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = { firstName, lastName, email, phone, password: hashedPassword };
            const userCreated = await userRepository.signUp(user, email, password);
            if (userCreated) {
                res.status(201).json({ message: 'Account created and email sent'});
            }else{
                res.status(500).json({ message: 'Error creating account'});
            }
        } catch (err) {
            next(err);
        }
    }

    // Login
    async signIn(req,res,next) {
        const {firstName, password} = req.body;

        try {
            // Find the user by firstName
            const user = await UserModel.findOne({firstName});
            if (!user) {
                return res.status(404).json({ message: "User not found. Please check your Credentials."});
            }
            // Comparing the password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(400).json({ message: "Incorrect Password. Please try again."});
            }
            // Generate JWT token
            const token = jwt.sign({ id: user._id, firstName: user.firstName, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'});   // 1hr validity
            // login successful
            return res.status(200).json({ message: "Login Successful!", token});
        } catch(err) {
            // console.error(err);
            next(err);  // passing the error to the error-handler middleware
        }
    }


    /** Upload **/

    async uploadProfilePic(req, res) {
        const userId = req.user.id;         // user id comes from authMiddleware file
        try {
            const user = await UserModel.findByIdAndUpdate(userId, { profilePicture: req.file.path }, { new: true });

            if (!user) return res.status(404).json({ message: "User not found." });

            res.status(200).json({
                message: "Profile picture updated successfully.",
                user,
            });
        } catch (err) {
            next(err);
        }
    };

    async addBio(req, res) {
        const { bio } = req.body;
        const userId = req.user.id;
        try {
            const user = await UserModel.findByIdAndUpdate( userId ,{ bio }, { new: true });

            if (!user) return res.status(404).json({ message: "User not found." });

            res.status(200).json({
                message: "Bio updated successfully.",
                user,
            });
        } catch (err) {
            next(err);
        }
    };

    async uploadVideo(req, res) {
        const { title, description } = req.body;
        const userId = req.user.id; 

        try {
            const user = await UserModel.findByIdAndUpdate(
                userId ,
                { $push: { videos: { title, description, videoPath: req.file.path } } },
                { new: true }
            );

            if (!user) return res.status(404).json({ message: "User not found." });

            res.status(200).json({
                message: "Video uploaded successfully.",
                user,
            });
        } catch (err) {
            next(err);
        }
    };

    async getUserData(req, res) {
        const userId = req.user.id; 
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }
            res.status(200).json(user);
        } catch (error) {
            next(err);
        }
    };

    async getAllUsers(req, res) {
        try {
            const users = await UserModel.find({});
            console.log(users);
            if (!users) {
                return res.status(404).json({ message: "No user found."});
            }
            res.status(200).json(users);
        }catch(err) {
            next(err);
        }
    }

    async getUserAllVideos(req, res, next) {
        try {
            const {userId} = req.params;
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "user not found."});
            }
            res.status(200).json({ videos: user.videos});
        }catch(err) {
            next(err);
        }
    }

}



// const email = "riteshsingh836@gmail.com";

// sendEmail(email, generatePassword);