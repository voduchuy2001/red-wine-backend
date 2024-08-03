import { TOO_MANY_REQUESTS } from '@constants/http.status.code'
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
      HttpHelper.json(
        res,
        TOO_MANY_REQUESTS,
        __('Too many requests! Please try again after {{minutes}} minute(s)', { minutes })
      )
    }
  })
