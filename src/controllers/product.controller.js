import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, NO_CONTENT, NOT_FOUND, OK } from "@constants/http.status.code";
import { MESSAGES } from "@constants/message";
import HttpHelper from "@utils/http";

export default class ProductController {
    constructor(productService) {
        this.productService = productService;
    }

    async getProducts(req, res) {
        const { page, limit, search, categoryIds } = req.query;
        const options = { page, paginate: limit, search, categoryIds };

        try {
            const products = await this.productService.getProducts(options);

            if (!products?.docs?.length) {
                return HttpHelper.successResponse(res, NOT_FOUND, MESSAGES.failure);
            }

            return HttpHelper.successResponse(res, OK, MESSAGES.success, products);
        } catch (error) {
            return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message);
        }
    }

    async createProduct(req, res) {
        const validatedData = req.body;

        try {
            const product = await this.productService.createProduct(validatedData, validatedData.categoryIds);

            if (!product) {
                return HttpHelper.successResponse(res, BAD_REQUEST, MESSAGES.failure);
            }

            return HttpHelper.successResponse(res, CREATED, MESSAGES.success, product);
        } catch (error) {
            return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message);
        }
    }

    async getProduct(req, res) {
        const validatedData = req.params;

        try {
            const product = await this.productService.getProduct(validatedData);

            if (!product) {
                return HttpHelper.successResponse(res, NOT_FOUND, MESSAGES.failure);
            }

            return HttpHelper.successResponse(res, OK, MESSAGES.success, product);
        } catch (error) {
            return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message);
        }
    }

    async updateProduct(req, res) {
        const validatedData = { ...req.params, ...req.body };
        try {
            const product = await this.productService.updateProduct(validatedData);

            if (!product) {
                return HttpHelper.successResponse(res, BAD_REQUEST, MESSAGES.failure);
            }

            return HttpHelper.successResponse(res, OK, MESSAGES.success, product);
        } catch (error) {
            return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message);
        }
    }

    async destroyProduct(req, res) {
        const validatedData = req.params;

        try {
            const product = await this.productService.destroyProduct(validatedData);

            if (!product.length) {
                return HttpHelper.successResponse(res, NOT_FOUND, MESSAGES.failure);
            }

            return HttpHelper.successResponse(res, OK, MESSAGES.success);
        } catch (error) {
            return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message);
        }
    }
}
