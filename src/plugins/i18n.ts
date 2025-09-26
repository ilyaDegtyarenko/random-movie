import { createI18n } from 'vue-i18n'
import uk from '@/locales/uk.json'
import en from '@/locales/en.json'

/**
 * Creates an instance of the i18n plugin.
 */
export default createI18n({
  legacy: false,
  locale: String(localStorage.getItem('userLang') || 'en'),
  fallbackLocale: 'en',
  messages: { uk, en },
})
