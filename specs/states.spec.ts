import { States } from '../src'

describe('States.getStates', () => {
  it('Get all countries', () => {
    const c = States.getStates()
    expect(c).toBeDefined()
    expect(c[0]).toHaveProperty('name')
    expect(c[0].name).toBe('Badakhshan')
    expect(c.length).toBeGreaterThan(10)
  })
  it('Get all countries with localization', () => {
    const c = States.getStates({
      locale: 'it',
    })
    expect(c).toBeDefined()
    expect(c[0]).toHaveProperty('name')
    expect(c[0].name).toBe('Badakhshan')
    expect(c.length).toBeGreaterThan(10)
  })
  it('Get a country by country_code', () => {
    const c = States.getStates({
      filters: {
        country_code: 'IT',
      },
    })
    expect(c).toBeDefined()
    expect(c[0]).toHaveProperty('name')
    expect(c[0].name).toBe('Abruzzo')
    expect(c).toHaveLength(129)
  })
  it('Get italians regions and locale', () => {
    const c = States.getStates({
      filters: {
        country_code: 'IT',
        is_region: true,
      },
      locale: 'it',
    })
    expect(c).toBeDefined()
    expect(c[0]).toHaveProperty('name')
    expect(c[0].name).toBe('Abruzzo')
    expect(c).toHaveLength(20)
  })
  it('Get italians provinces and locale', () => {
    const c = States.getStates({
      filters: {
        country_code: 'IT',
        is_region: false,
      },
    })
    expect(c).toBeDefined()
    expect(c[0]).toHaveProperty('name')
    expect(c[0].name).toBe('Province of Benevento')
    expect(c).toHaveLength(109)
  })
  it('Get italians provinces and locale', () => {
    const c = States.getStates({
      filters: {
        country_code: 'IT',
        is_region: false,
      },
      locale: 'it',
    })
    expect(c).toBeDefined()
    expect(c[0]).toHaveProperty('name')
    expect(c[0].name).toBe('Provincia di Benevento')
    expect(c).toHaveLength(109)
  })
})
