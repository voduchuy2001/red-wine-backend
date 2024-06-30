import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from "@constants/http.status.code";
import { MESSAGES } from "@constants/message";
import HttpHelper from "@utils/http";

export default class OAuthGoogleController {
    constructor(googleOAuthService) {
        this.googleOAuthService = googleOAuthService;
    }

    async redirect(req, res) {
        try {
            const redirectUrl = await this.googleOAuthService.redirect();

            if (!redirectUrl) {
                return HttpHelper.successResponse(res, BAD_REQUEST, MESSAGES.failure);
            }

            return HttpHelper.successResponse(res, OK, MESSAGES.success, redirectUrl);
        } catch (error) {
            return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message);
        }
    }

    async callback(req, res) {
        const { code } = req.query;

        try {
            if (!code) {
                return HttpHelper.successResponse(res, UNAUTHORIZED, MESSAGES.failure);
            }

            const loggedIn = await this.googleOAuthService.callback(code);

            if (!loggedIn) {
                return HttpHelper.successResponse(res, UNAUTHORIZED, MESSAGES.failure);
            }

            return HttpHelper.successResponse(res, OK, MESSAGES.success, loggedIn);
        } catch (error) {
            return HttpHelper.errorResponse(res, INTERNAL_SERVER_ERROR, MESSAGES.failure, error.message);
        }
    }
}
