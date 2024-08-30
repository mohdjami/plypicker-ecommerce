import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  getProductById,
} from "../controllers/productController.js";
import roleMiddleware from "../middleware/role.js";

const router = express.Router();
router
  .route("/")
  .post(roleMiddleware(["admin"]), createProduct)
  .get(getProducts);
router
  .route("/:id")
  .get(getProductById)
  .post(roleMiddleware(["admin"]), updateProduct);
router.route("/update-product").post(roleMiddleware(["admin"]), updateProduct);

export default router;
