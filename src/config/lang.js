import i18n from 'i18n'
import path from 'path'

i18n.configure({
  locales: ['en', 'vi'],
  directory: path.join(__dirname, '../lang'),
  defaultLocale: 'en',
  objectNotation: true,
  register: global
})

export default i18n
