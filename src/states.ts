import { States } from '.'
import states from './data/states.json'
import { dataFiltered } from './utils'

type Translations = 'it'

type Args = {
  filters?: {
    country_code?: string
    is_region?: boolean
  }
  locale?: Translations
}

type States = typeof states

export function getStates(args?: Args): States {
  let data = [...states]
  if (args?.filters !== undefined) {
    const { filters } = args
    data = dataFiltered(data, filters as any)
  }
  if (args?.locale !== undefined) {
    const { locale } = args
    data = data.map(item => {
      const newItem = { ...item }
      const name = newItem?.translations
        ? newItem?.translations?.[locale]
        : item.name
      if (name) newItem.name = name
      return newItem
    })
  }
  return data
}

export default {
  getStates,
}
