import { ApplicationError } from "../../error-handler/applicationError.js";
import sendEmail from "../../middlewares/sendEmail.middleware.js";
import { UserModel } from "./user.schema.js";

export default class UserRepository {

    async signUp(user, email, password) {
        try {
            // Save user to database
            const newUser = new UserModel(user);
            await newUser.save();
            // Sending the mail after Registration of User
            sendEmail(email, password);
            // console.log(newUser);
            return newUser;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }   
    }
}