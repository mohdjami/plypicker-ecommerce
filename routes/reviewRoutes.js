import express from "express";
import {
  approveRequests,
  getRequests,
  rejectRequest,
  getRequestById,
} from "../controllers/reviewController.js";
import roleMiddleware from "../middleware/role.js";
const router = express.Router();

router.route("/").get(roleMiddleware(["admin"]), getRequests);
router.route("/:id").get(roleMiddleware(["admin"]), getRequestById);
router.route("/approve").post(roleMiddleware(["admin"]), approveRequests);
router.route("/reject").get(roleMiddleware(["admin"]), rejectRequest);

export default router;
