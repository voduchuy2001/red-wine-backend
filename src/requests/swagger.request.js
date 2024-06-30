import { MESSAGES } from "@constants/message";
import { body } from "express-validator";

export const swagger = () => [
    body("username").notEmpty().bail().withMessage(MESSAGES.notEmpty).isString().bail().withMessage(MESSAGES.isString),

    body("password").notEmpty().bail().withMessage(MESSAGES.notEmpty).isString().bail().withMessage(MESSAGES.isString),
];
