import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import { dbConnection } from "./database/dbConnection.js"
import ErrorHandler, { errorMiddleware } from "./middleswares/error.js"


import userRouter from "./routes/userRouter.js"
import applicationRouter from "./routes/applicationRouter.js"
import jobRouter from "./routes/jobRouter.js"

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


app.use("/api/v1/users", userRouter)
app.use("/api/v1/application", applicationRouter)
app.use("/api/v1/job", jobRouter)

dbConnection()

app.use(errorMiddleware)

export default app;