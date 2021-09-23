import cities from './data/cities.json'
import { dataFiltered } from './utils'

type Cities = {
  id: number
  name: string
  state_id: number
  state_code: string
  country_id: number
  country_code: string
  latitude: string
  longitude: string
}[]

type Args = {
  filters?:
    | {
        country_code?: never
        state_code?: never
      }
    | {
        country_code: string
        state_code?: string
      }
}

export function getCities(args?: Args): Cities {
  let data = [...(cities as Cities)]
  if (args?.filters !== undefined) {
    const { filters } = args
    data = dataFiltered(data, filters as any)
  }
  return data
}

export default {
  getCities,
}
