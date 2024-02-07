import express from "express"
import { login, logout, register } from "../controllers/userController.js";
import { isAuthenticated } from "../middleswares/auth.js"

const router = express.Router();


router.post("/register", register)
router.post("/login", login)
router.post("/logout",isAuthenticated, logout)

export default router;