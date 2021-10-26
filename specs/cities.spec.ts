import { Cities } from '../lib/esm'

describe('Cities.getCities', () => {
  it('Get all countries', () => {
    const c = Cities.getCities()
    expect(c).toBeDefined()
    expect(c[0]).toHaveProperty('name')
    expect(c[0].name).toBe('Ashkāsham')
    expect(c.length).toBeGreaterThan(10)
  })
  it('Get ligurian cities by filters', () => {
    const c = Cities.getCities({
      filters: {
        country_code: 'IT',
        state_code: '42',
      },
    })
    expect(c).toBeDefined()
    expect(c[0]).toHaveProperty('name')
    expect(c[0].name).toBe('Airole')
    expect(c).toHaveLength(277)
  })
  it('Get italians cities', () => {
    const c = Cities.getCities({
      filters: {
        country_code: 'IT',
      },
    })
    expect(c).toBeDefined()
    expect(c[0]).toHaveProperty('name')
    expect(c[0].name).toBe('Abbateggio')
    expect(c).toHaveLength(9948)
  })
  it('Get italians cities and sort by asc', () => {
    const c = Cities.getCities({
      filters: {
        country_code: 'IT',
      },
      sort: {
        mode: 'asc',
      },
    })
    expect(c).toBeDefined()
    expect(c[0]).toHaveProperty('name')
    expect(c[0].name).toBe('Abbateggio')
    expect(c).toHaveLength(9948)
  })
  it('Get italians cities and sort by desc', () => {
    const c = Cities.getCities({
      filters: {
        country_code: 'IT',
      },
      sort: {
        mode: 'desc',
      },
    })
    expect(c).toBeDefined()
    expect(c[0]).toHaveProperty('name')
    expect(c[0].name).toBe('Zugliano')
    expect(c).toHaveLength(9948)
  })
  it('Get italians cities and sort by alphabetic name', () => {
    const c = Cities.getCities({
      filters: {
        country_code: 'IT',
      },
      sort: {
        mode: 'alphabetical',
        key: 'name',
      },
    })
    expect(c).toBeDefined()
    expect(c[0]).toHaveProperty('name')
    expect(c[0].name).toBe('Abano Terme')
    expect(c).toHaveLength(9948)
  })
})
