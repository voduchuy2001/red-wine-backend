import i18n from '@config/lang'
import { SUPPORTED_LANGUAGES } from '@constants/lang'

export default function lang(req, res, next) {
  const lang = req.headers['accept-language']?.split(',')[0]
  SUPPORTED_LANGUAGES.includes(lang) ? i18n.setLocale(lang) : 'en'

  next()
}
