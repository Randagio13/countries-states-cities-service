import type { City } from './types'
import { dataFiltered, sorter, type SortArgs } from './utils'
import rawData from './data/cities.json'

export type { City } from './types'

type CityRow = [
  id: number,
  name: string,
  state_code: string,
  cc_idx: number,
  lat: number,
  lon: number,
]

interface PackedCities {
  cc: string[]
  ci: Record<string, number>
  si: Record<string, number>
  data: CityRow[]
}

const packed = rawData as unknown as PackedCities

let _cache: City[] | undefined

function citiesData(): City[] {
  if (_cache !== undefined) return _cache
  const { cc, ci, si, data } = packed
  _cache = data.map(([id, name, state_code, cc_idx, lat, lon]) => {
    const country_code = cc[cc_idx]!
    return {
      id,
      name,
      state_id: si[`${country_code}:${state_code}`]!,
      state_code,
      country_id: ci[country_code]!,
      country_code,
      latitude: String(lat / 10000),
      longitude: String(lon / 10000),
    }
  })
  return _cache
}

export interface CityFilters {
  country_code?: string | string[]
  state_code?: string
}

export interface GetCitiesArgs {
  filters?: CityFilters
  sort?: SortArgs<City>
}

export class Cities {
  static getCities(args?: GetCitiesArgs): City[] {
    let data = [...citiesData()]

    if (args?.filters !== undefined) {
      data = dataFiltered(data, args.filters as Record<string, unknown>)
    }

    if (args?.sort !== undefined) {
      data = sorter(data, args.sort)
    }

    return data
  }
}
