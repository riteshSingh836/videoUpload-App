import mongoose from 'mongoose';

// User schema
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String, maxLength: 500 },
  profilePicture: { type: String },
  videos: [
    {
      title: { type: String, required: true, maxLength: 30 },
      description: { type: String, required: true, maxLength: 120 },
      videoPath: { type: String , required: true},  // file path
    }
  ]
});

export const UserModel = mongoose.model('User', UserSchema);