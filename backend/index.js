import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './src/features/user/user.routes.js';
import { connectUsingMongoose } from './src/config/mongooseConfig.js';
import applicationErrorMiddleware from './src/error-handler/applicationError.js';
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(cors());

app.use("/uploads", express.static("uploads"));

// logger middleware
app.use(loggerMiddleware);

// app.get("/", (req,res) => {
//     res.send("Welcome to the Video Upload Api!");
// });

app.use('/api/users', userRouter);

// Error-handler
app.use(applicationErrorMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is running at ${port}`);
    connectUsingMongoose();
})
