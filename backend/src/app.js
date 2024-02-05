import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"


const app = express()

dotenv.config({
    path: './.env'
})

app.use(
    cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET','POST','DELETE','PUT'],
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true,limit: "16kb"}))
app.use(cookieParser())

app.use(
    fileUpload(
        {
            useTempFiles: true,
            tempFileDir:"'/tmp/"
        }
        
));

export default app;