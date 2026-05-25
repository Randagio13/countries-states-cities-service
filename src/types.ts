export type TranslationLocale =
  | 'kr'
  | 'br'
  | 'pt'
  | 'nl'
  | 'hr'
  | 'fa'
  | 'de'
  | 'es'
  | 'fr'
  | 'ja'
  | 'it'
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
