import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from "@constants/http.status.code";
import { MESSAGES } from "@constants/message";
import HttpHelper from "@utils/http";

export default class LoginController {
    constructor(authService) {
        this.authService = authService;
    }

    async login(req, res) {
        const validatedData = req.body;
        try {
            const loggedIn = await this.authService.login(validatedData);

            if (!loggedIn) {
                return HttpHelper.successResponse(res, UNAUTHORIZED, MESSAGES.failure);
            }

            return HttpHelper.successResponse(res, OK, MESSAGES.success, loggedIn);
        } catch (error) {
            return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message);
        }
    }
}
