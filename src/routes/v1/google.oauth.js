import express from "express";
import { googleOAuthController } from "@di/container";

const router = express.Router();

router.get("/redirect/google", googleOAuthController.redirect.bind(googleOAuthController));
router.get("/callback/google", googleOAuthController.callback.bind(googleOAuthController));

export default router;
