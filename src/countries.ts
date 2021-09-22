import countries from './data/countries.json'
import { dataFiltered } from './utils'

type Translations = typeof countries[0]['translations']

type Args = {
  filters?:
    | {
        iso2: string
        iso3?: never
      }
    | {
        iso2?: never
        iso3: string
      }
  locale?: keyof Translations
}

type Countries = typeof countries

export function getCountries(args?: Args): Countries {
  let data = [...countries]
  if (args?.filters !== undefined) {
    const { filters } = args
    data = dataFiltered(data, filters as any)
  }
  if (args?.locale !== undefined) {
    const { locale } = args
    data = data.map(item => {
      const newItem = { ...item }
      const name = newItem.translations?.[locale]
      if (name) newItem.name = name
      return newItem
    })
  }
  return data
}

export default {
  getCountries,
}
