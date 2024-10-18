import i18n from 'i18n'
import path from 'path'

const defaultLocale = process.env.LOCALE ? process.env.APP_LOCALE : 'en'

i18n.configure({
  locales: ['en', 'vi'],
  directory: path.join(__dirname, '../lang'),
  defaultLocale,
  objectNotation: true,
  fallbacks: { vi: 'en' },
  // eslint-disable-next-line no-undef
  register: global
})

export default i18n
