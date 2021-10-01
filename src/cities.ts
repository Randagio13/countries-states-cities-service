import cities from '#data/cities.json'
import { dataFiltered, sorter } from './utils'

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

type Cities = City[]

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
  sort?:
    | {
        mode: 'asc'
        key?: never
      }
    | {
        mode: 'desc'
        key?: never
      }
    | {
        mode: 'alphabetical'
        key: 'name'
      }
}

export function getCities(args?: Args): Cities {
  let data = [...(cities as Cities)]
  if (args?.filters !== undefined) {
    const { filters } = args
    data = dataFiltered(data, filters as any)
  }
  if (args?.sort !== undefined) {
    data = sorter(data, args?.sort)
  }
  return data
}

export default {
  getCities,
}
