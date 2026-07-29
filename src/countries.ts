import countriesDataRaw from './data/countries.json'
import type { Country, TranslationLocale } from './types'
import {
  dataFiltered,
  deepFreeze,
  resolveTranslation,
  type SortArgs,
  sorter,
} from './utils'

export type { Country, TranslationLocale } from './types'

const countriesData = deepFreeze(countriesDataRaw as unknown as Country[])

type CountryFilters = { iso2: string | string[] } | { iso3: string | string[] }

export interface GetCountriesArgs {
  filters?: CountryFilters
  locale?: TranslationLocale
  sort?: SortArgs<Country>
}

export class Countries {
  static getCountries(args?: GetCountriesArgs): Country[] {
    let data = [...countriesData]

    if (args?.filters !== undefined) {
      data = dataFiltered(data, args.filters as Record<string, unknown>)
    }

    if (args?.locale !== undefined) {
      const { locale } = args
      data = data.map(country => ({
        ...country,
        name: resolveTranslation(country.translations, locale, country.name),
      }))
    }

    if (args?.sort !== undefined) {
      data = sorter(data, args.sort)
    }

    return data
  }
}
