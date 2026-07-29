import {
  dataFiltered,
  deepFreeze,
  resolveTranslation,
  sorter,
} from '../src/utils'

describe('dataFiltered', () => {
  it('rejects filters on non-own-property keys', () => {
    const data = [{ name: 'Italy', iso2: 'IT' }]
    expect(dataFiltered(data, { nonExistentKey: 'value' })).toHaveLength(0)
  })
})

describe('sorter', () => {
  it('returns copy in asc (original) order', () => {
    const data = [{ name: 'B' }, { name: 'A' }]
    const result = sorter(data, { mode: 'asc' })
    expect(result[0]?.name).toBe('B')
  })
})

describe('resolveTranslation', () => {
  it('falls back when translations are absent', () => {
    expect(resolveTranslation(undefined, 'it', 'Genoa')).toBe('Genoa')
  })

  it('falls back when the locale is not an own property', () => {
    expect(resolveTranslation({}, 'it', 'Genoa')).toBe('Genoa')
  })

  it('falls back on an empty-string translation', () => {
    expect(resolveTranslation({ it: '' }, 'it', 'Genoa')).toBe('Genoa')
  })

  it('returns the translation when present', () => {
    expect(resolveTranslation({ it: 'Genova' }, 'it', 'Genoa')).toBe('Genova')
  })

  it('ignores inherited keys such as toString', () => {
    expect(resolveTranslation({}, 'toString', 'Genoa')).toBe('Genoa')
  })

  it('maps the deprecated kr alias onto ko', () => {
    expect(resolveTranslation({ ko: '이탈리아' }, 'kr', 'Italy')).toBe(
      '이탈리아'
    )
  })

  it('maps the deprecated cn alias onto zh-CN', () => {
    expect(resolveTranslation({ 'zh-CN': '意大利' }, 'cn', 'Italy')).toBe(
      '意大利'
    )
  })
})

describe('deepFreeze', () => {
  it('passes through null', () => {
    expect(deepFreeze(null)).toBeNull()
  })

  it('passes through primitives', () => {
    expect(deepFreeze('already immutable')).toBe('already immutable')
  })

  it('returns an already-frozen value untouched', () => {
    const frozen = Object.freeze({ a: 1 })
    expect(deepFreeze(frozen)).toBe(frozen)
  })

  it('freezes nested objects and arrays', () => {
    const value = deepFreeze({ a: { b: [{ c: 1 }] } })
    expect(Object.isFrozen(value)).toBe(true)
    expect(Object.isFrozen(value.a)).toBe(true)
    expect(Object.isFrozen(value.a.b)).toBe(true)
    expect(Object.isFrozen(value.a.b[0])).toBe(true)
  })
})
