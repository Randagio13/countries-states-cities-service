import countries from './data/countries.json'

type Translations = typeof countries[0]['translations']

type Args = {
  filters?: ({
    iso2: string
    iso3?: never
  } | {
    iso2?: never
    iso3: string
  })
  locale?: keyof Translations
}

type Countries = typeof countries

export function getCountries(args?: Args): Countries {
  let data = [...countries]
  if (args?.filters !== undefined) {
    const { filters } = args
    data = data.filter(({ iso2, iso3 }) => {
      if (filters?.iso2)
        return filters.iso2.toLowerCase() === iso2.toLowerCase()
      if (filters?.iso3)
        return filters.iso3.toLowerCase() === iso3.toLowerCase()
      return true
    })
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
