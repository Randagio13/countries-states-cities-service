import { dataFiltered, sorter } from '../src/utils'

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
