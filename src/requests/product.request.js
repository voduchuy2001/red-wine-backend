import { MESSAGES } from "@constants/message";
import { body, param, query } from "express-validator";

export const retrieve = () => [
    query("name").optional({ checkFalsy: true }).bail().isString().withMessage(MESSAGES.isString),

    query("categoryIds")
        .optional({ nullable: true, checkFalsy: true })
        .bail()
        .isString()
        .bail()
        .withMessage(MESSAGES.isString)
        .custom((ids) => {
            const arrayIds = ids.split(",");
            const isValid = arrayIds.every((id) => /^\d+$/.test(id.trim()));

            if (!isValid) throw new Error(MESSAGES.invalidFormat);

            return true;
        }),
];

export const create = () => [
    body("name")
        .notEmpty()
        .bail()
        .withMessage(MESSAGES.notEmpty)
        .isLength({ max: 120 })
        .bail()
        .withMessage(MESSAGES.isLength(null, 120)),

    body("price")
        .notEmpty()
        .bail()
        .withMessage(MESSAGES.notEmpty)
        .isInt({ min: 1, max: 1000000000 })
        .bail()
        .withMessage(MESSAGES.isLength(1, 1000000000)),

    body("description").optional({ nullable: true, checkFalsy: true }),

    body("categoryIds")
        .optional({ nullable: true, checkFalsy: true })
        .bail()
        .isArray({ min: 1 })
        .withMessage(MESSAGES.isArray(1)),

    body("categoryIds.*").isInt({ min: 1 }).bail().withMessage(MESSAGES.isInt(1)),

    body("content").optional({ nullable: true, checkFalsy: true }),

    body("status").optional({ nullable: true, checkFalsy: true }).isIn(["active", "inactive", "draft"]),

    body("images").optional({ nullable: true, checkFalsy: true }),

    body("order").optional({ nullable: true, checkFalsy: true }).isInt().bail().withMessage(MESSAGES.isInt()),

    body("isFeatured")
        .optional({ nullable: true, checkFalsy: true })
        .isBoolean()
        .bail()
        .withMessage(MESSAGES.isBoolean),

    body("salePrice").optional({ nullable: true, checkFalsy: true }).isDecimal().bail().withMessage(MESSAGES.isDouble),

    body("length").optional({ nullable: true, checkFalsy: true }).isFloat().bail().withMessage(MESSAGES.isFloat),

    body("width").optional({ nullable: true, checkFalsy: true }).isFloat().bail().withMessage(MESSAGES.isFloat),

    body("height").optional({ nullable: true, checkFalsy: true }).isFloat().bail().withMessage(MESSAGES.isFloat),

    body("weight").optional({ nullable: true, checkFalsy: true }).isFloat().bail().withMessage(MESSAGES.isFloat),

    body("barcode")
        .optional({ nullable: true, checkFalsy: true })
        .isLength({ max: 255 })
        .bail()
        .withMessage(MESSAGES.isLength(null, 255)),
];

export const show = () => [
    param("id")
        .notEmpty()
        .bail()
        .withMessage(MESSAGES.notEmpty)
        .isInt({ min: 1 })
        .bail()
        .withMessage(MESSAGES.isInt(null, 1)),
];
