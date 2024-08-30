import express from "express";
import {
  submitProduct,
  getSubmissions,
} from "../controllers/submissionController.js";
import roleMiddleware from "../middleware/role.js";

const router = express.Router();

router.post("/", roleMiddleware(["team member"]), submitProduct);
router.get("/", getSubmissions);

export default router;
