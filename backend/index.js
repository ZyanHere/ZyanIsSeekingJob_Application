import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './utils/db.js';
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"

dotenv.config({});

const app = express();

app.get("home", (req, res) => {
    return res.status(200).json({
        message: "Welcome to the home page!",
        success: true,
    })
})

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions))
PORT =process.env.PORT || 3000;

//api
app.use("api/v1/user", userRoute);
app.use("api/v1/company", companyRoute);

connectDB().
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})