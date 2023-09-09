import en from './lang/ja'

export function t(key) {
  const LOCALE_KEY = 'CUSDIS_LOCALE'

  const locale = window[LOCALE_KEY] || ja

  const content = locale[key] || ja[key]
  if (!locale[key]) {
    console.warn(
      '[cusdis]',
      'translation of language key',
      `'${key}'`,
      'is missing.',
    )
  }
  return content
}
