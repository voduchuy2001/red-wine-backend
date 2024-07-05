import { TOO_MANY_REQUESTS } from '@constants/http.status.code'
import { MESSAGES } from '@constants/message'
import HttpHelper from '@utils/http'
import { rateLimit } from 'express-rate-limit'

export const limiter = (windowMs, max) =>
  rateLimit({
    windowMs,
    max,
    headers: true,
    statusCode: 429,
    handler: (req, res) => {
      const minutes = Math.ceil((req.rateLimit.resetTime - Date.now()) / 60000)
      HttpHelper.errorResponse(res, TOO_MANY_REQUESTS, MESSAGES.tooManyRequests(minutes))
    }
  })
