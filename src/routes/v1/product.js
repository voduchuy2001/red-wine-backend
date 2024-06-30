import express from "express";
import { validate } from "@middlewares/validation";
import { create, retrieve, show } from "@requests/product.request";
import { productController } from "@di/container";

const router = express.Router();

router.get("/products", validate(retrieve()), productController.getProducts.bind(productController));
router.post("/create-product", validate(create()), productController.createProduct.bind(productController));
router.get("/product/:id", validate(show()), productController.getProduct.bind(productController));

export default router;
