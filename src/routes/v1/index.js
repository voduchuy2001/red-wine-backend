import express from "express";
import productRoutes from "@routes/v1/product";
import authRoutes from "@routes/v1/auth";
import googleOAuthRoutes from "@routes/v1/google.oauth";
import swaggerAuthRoutes from "@routes/v1/swagger";
import welcomeController from "@controllers/welcome.controller";

const router = express.Router();

router.use("/", productRoutes);
router.use("/", authRoutes);
router.use("/", googleOAuthRoutes);
router.use("/", swaggerAuthRoutes);
router.get("/", welcomeController.index);

export default router;
