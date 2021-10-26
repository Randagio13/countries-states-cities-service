import { SortType } from './index'

export function dataFiltered<D, F extends keyof D>(
  data: D[],
  filters: Record<F, any>
): D[] {
  for (const filter of Object.keys(filters)) {
    data = data.filter((item) => filters[filter as F] === item[filter as F])
  }
  return data
}

type O = {
  mode: SortType
  key?: any
}

export function sorter<D, S extends O>(data: D[], options: S): D[] {
  switch (options.mode) {
    case 'alphabetical':
      return data.sort((a: any, b: any) =>
        a[options.key as string].localeCompare(b[options?.key as string])
      )
    case 'desc':
      return data.reverse()
    default:
      return data.sort()
  }
}
