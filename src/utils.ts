type AlphabeticalSort<D> = { mode: 'alphabetical'; key: keyof D & string }
type DirectionalSort = { mode: 'asc' | 'desc' }
export type SortArgs<D> = AlphabeticalSort<D> | DirectionalSort

/**
 * Locale codes this package accepted before upstream renamed them. Kept so
 * existing callers keep compiling — and start getting a real translation
 * instead of the silent English fallback these used to produce.
 */
const LOCALE_ALIASES: Record<string, string> = {
  kr: 'ko',
  cn: 'zh-CN',
}

/**
 * Resolves a localised name, falling back to the canonical one.
 *
 * Own-property only: the bundled data is JSON-derived, so an inherited key
 * (`toString`, `constructor`) must never be mistaken for a translation. An
 * empty-string translation also falls back — a blank name is never useful.
 */
export function resolveTranslation(
  translations: { readonly [locale: string]: string | undefined } | undefined,
  locale: string,
  fallback: string
): string {
  if (translations === undefined) return fallback
  // An alias means the key in the data differs from the locale asked for, so
  // the lookup key cannot be tied to the caller's locale type.
  const key = LOCALE_ALIASES[locale] ?? locale
  if (!Object.hasOwn(translations, key)) return fallback
  return translations[key] || fallback
}

/**
 * Recursively freezes the bundled data at module load.
 *
 * The services hand out the canonical objects rather than copies, so without
 * this a caller mutating a result would corrupt the data for every later call
 * in the process. Freezing turns that silent corruption into a loud
 * `TypeError` under ESM's strict mode.
 */
export function deepFreeze<T>(value: T): T {
  if (value === null || typeof value !== 'object' || Object.isFrozen(value)) {
    return value
  }
  Object.freeze(value)
  for (const nested of Object.values(value as Record<string, unknown>)) {
    deepFreeze(nested)
  }
  return value
}

export function dataFiltered<D>(
  data: D[],
  filters: Record<string, unknown>
): D[] {
  return data.filter(item => {
    const record = item as Record<string, unknown>
    return Object.entries(filters).every(([key, value]) => {
      if (!Object.hasOwn(record, key)) return false
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
