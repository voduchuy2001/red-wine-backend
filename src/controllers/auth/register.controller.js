import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR } from "@constants/http.status.code";
import { MESSAGES } from "@constants/message";
import HttpHelper from "@utils/http";

export default class RegisterController {
    constructor(authService) {
        this.authService = authService;
    }

    async register(req, res) {
        const validatedData = req.body;
        try {
            const registered = await this.authService.register(validatedData);

            if (!registered) {
                return HttpHelper.successResponse(res, BAD_REQUEST, MESSAGES.failure);
            }

            return HttpHelper.successResponse(res, CREATED, MESSAGES.success, registered);
        } catch (error) {
            return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message);
        }
    }
}
