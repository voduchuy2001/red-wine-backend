import { TOO_MANY_REQUESTS } from '@constants/http.status.code'
import { rateLimit } from 'express-rate-limit'

export const limiter = (windowMs, max) =>
  rateLimit({
    windowMs,
    max,
    headers: true,
    statusCode: 429,
    handler: (req, res) => {
      const minutes = Math.ceil((req.rateLimit.resetTime - Date.now()) / 60000)
      return res.status(TOO_MANY_REQUESTS).json({
        status: TOO_MANY_REQUESTS,
        message: __('Too many requests! Please try again after {{minutes}} minute(s)', { minutes })
      })
    }
  })
