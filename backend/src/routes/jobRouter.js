import express from "express"
import { deletejobs, getAllJobs, getSingleJob, getmyJobs, postJob, updateJobs } from "../controllers/jobController.js";
import { isAuthenticated } from "../middleswares/auth.js";

const router = express.Router();

router.get("/getAll", getAllJobs)
router.post("/post",isAuthenticated, postJob)
router.get("/getmyjobs",isAuthenticated, getmyJobs)
router.put("/update/:id",isAuthenticated, updateJobs)
router.delete("/delete/:id",isAuthenticated, deletejobs)
router.get("/:id",isAuthenticated, getSingleJob)


export default router;