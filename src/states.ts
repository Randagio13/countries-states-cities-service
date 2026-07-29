import statesDataRaw from './data/states.json'
import type { State, TranslationLocale } from './types'
import {
  dataFiltered,
  deepFreeze,
  resolveTranslation,
  type SortArgs,
  sorter,
} from './utils'

export type { State, TranslationLocale } from './types'

const statesData = deepFreeze(statesDataRaw as unknown as State[])

export interface StateFilters {
  country_code?: string | string[]
  state_code?: string
  is_region?: boolean
}

export interface GetStatesArgs {
  filters?: StateFilters
  locale?: TranslationLocale
  sort?: SortArgs<State>
}

export class States {
  static getStates(args?: GetStatesArgs): State[] {
    let data = [...statesData]

    if (args?.filters !== undefined) {
      data = dataFiltered(data, args.filters as Record<string, unknown>)
    }

    if (args?.locale !== undefined) {
      const { locale } = args
      data = data.map(state => ({
        ...state,
        name: resolveTranslation(state.translations, locale, state.name),
      }))
    }

    if (args?.sort !== undefined) {
      data = sorter(data, args.sort)
    }

    return data
  }
}
