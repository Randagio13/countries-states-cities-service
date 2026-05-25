type AlphabeticalSort<D> = { mode: 'alphabetical'; key: keyof D & string }
type DirectionalSort = { mode: 'asc' | 'desc' }
export type SortArgs<D> = AlphabeticalSort<D> | DirectionalSort

export function dataFiltered<D>(
  data: D[],
  filters: Record<string, unknown>
): D[] {
  return data.filter(item => {
    const record = item as Record<string, unknown>
    return Object.entries(filters).every(([key, value]) => {
      const itemValue = record[key]
      if (Array.isArray(value)) {
        return (value as unknown[]).includes(itemValue)
      }
      return itemValue === value
    })
  })
}

export function sorter<D>(data: D[], options: SortArgs<D>): D[] {
  const copy = [...data]
  if (options.mode === 'alphabetical') {
    const { key } = options
    return copy.sort((a, b) => {
      const aVal = String((a as Record<string, unknown>)[key])
      const bVal = String((b as Record<string, unknown>)[key])
      return aVal.localeCompare(bVal)
    })
  }
  if (options.mode === 'desc') {
    return copy.reverse()
  }
  return copy
}
