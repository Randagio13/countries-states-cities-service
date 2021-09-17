import countries from './data/countries.json'

type Translations = typeof countries[0]['translations']

type Args = {
  filters?: {
    iso2?: string
    iso3?: string
  }
  locale?: keyof Translations
}

type Countries = typeof countries

export function getCountries(args?: Args): Countries {
  let data = countries
  if (args?.filters !== undefined) {
    const { filters } = args
    data = data.filter(({ iso2, iso3 }) => {
      if (filters?.iso2) return filters.iso2 === iso2
      if (filters?.iso3) return filters.iso3 === iso3
      return true
    })
  }
  if (args?.locale) {
    const { locale } = args
    data = data.map(item => {
      const name = item.translations?.[locale]
      if (name) item.name = name
      return item
    })
  }
  return data
}

export default {
  getCountries,
}
