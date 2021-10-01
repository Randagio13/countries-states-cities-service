import states from '#data/states.json'
import { Translations } from './countries'
import { dataFiltered, sorter } from './utils'
import { States } from '.'

export interface State {
  state_code: string
  id: number
  longitude: string
  is_region?: boolean
  latitude: string
  country_code: string
  country_id: number
  translations?: Record<Translations, string>
  name: string
}

type States = State[]

type Args = {
  filters?:
    | {
        country_code?: never
        state_code?: never
        is_region?: never
      }
    | {
        country_code: string
        state_code?: string
        is_region?: boolean
      }
  locale?: Translations
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
        key: 'name' | 'state_code'
      }
}

export function getStates(args?: Args): States {
  let data = [...(states as States)]
  if (args?.filters !== undefined) {
    const { filters } = args
    data = dataFiltered(data, filters as any)
  }
  if (args?.locale !== undefined) {
    const { locale } = args
    data = data.map((item) => {
      const newItem = { ...item }
      const name =
        'translations' in newItem ? newItem?.translations?.[locale] : item.name
      if (name) newItem.name = name
      return newItem
    })
  }
  if (args?.sort !== undefined) {
    data = sorter(data, args?.sort)
  }
  return data
}

export default {
  getStates,
}
