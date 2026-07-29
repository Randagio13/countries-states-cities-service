/**
 * Locales carried by the bundled dataset.
 *
 * `country.translations` covers all of these; `state.translations` currently
 * only ever carries `it`, so other locales fall back to the canonical name.
 */
export type TranslationLocale =
  | 'ar'
  | 'br'
  | 'de'
  | 'es'
  | 'fa'
  | 'fr'
  | 'hi'
  | 'hr'
  | 'it'
  | 'ja'
  | 'ko'
  | 'nl'
  | 'pl'
  | 'pt'
  | 'pt-BR'
  | 'ru'
  | 'tr'
  | 'uk'
  | 'zh-CN'
  /**
   * @deprecated Upstream renamed this locale to `ko`. Still accepted and now
   * resolves correctly — it previously matched nothing and silently returned
   * the untranslated name.
   */
  | 'kr'
  /**
   * @deprecated Upstream renamed this locale to `zh-CN`. Still accepted and now
   * resolves correctly — it previously matched nothing and silently returned
   * the untranslated name.
   */
  | 'cn'

export type SortType = 'alphabetical' | 'asc' | 'desc'

export interface Country {
  id: number
  name: string
  iso3: string
  iso2: string
  numeric_code: string
  phone_code: string
  capital: string
  currency: string
  currency_symbol: string
  tld: string
  native: string
  region: string
  subregion: string
  timezones: Array<{
    zoneName: string
    gmtOffset: number
    gmtOffsetName: string
    abbreviation: string
    tzName: string
  }>
  translations: Partial<Record<TranslationLocale, string>>
  latitude: string
  longitude: string
  emoji: string
  emojiU: string
}

export interface State {
  id: number
  name: string
  state_code: string
  country_code: string
  country_id: number
  latitude: string
  longitude: string
  is_region?: boolean
  translations?: Partial<Record<TranslationLocale, string>>
}

export interface City {
  id: number
  name: string
  state_id: number
  state_code: string
  country_id: number
  country_code: string
  latitude: string
  longitude: string
}
