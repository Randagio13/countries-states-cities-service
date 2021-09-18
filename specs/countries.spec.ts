import { Countries } from '../src'

describe('Countries', () => {
  it('Get all countries', () => {
    const c = Countries.getCountries()
    expect(c).toBeDefined()
    expect(c[0]).toHaveProperty('name')
    expect(c[0].name).toBe('Afghanistan')
    expect(c.length).toBeGreaterThan(10)
  })
  it('Get all countries with localization', () => {
    const c = Countries.getCountries({ locale: 'es' })
    expect(c).toBeDefined()
    expect(c[0]).toHaveProperty('name')
    expect(c[0].name).toBe('Afganistán')
    expect(c.length).toBeGreaterThan(10)
  })
  it('Get a country by iso2', () => {
    const c = Countries.getCountries({
      filters: {
        iso2: 'IT',
      },
    })
    expect(c).toBeDefined()
    expect(c[0]).toHaveProperty('name')
    expect(c[0].name).toBe('Italy')
    expect(c).toHaveLength(1)
  })
  it('Get a country by filter and locale', () => {
    const c = Countries.getCountries({
      filters: {
        iso2: 'IT',
      },
      locale: 'de',
    })
    expect(c).toBeDefined()
    expect(c[0]).toHaveProperty('name')
    expect(c[0].name).toBe('Italien')
    expect(c).toHaveLength(1)
  })
  it('Get a country by iso3', () => {
    const c = Countries.getCountries({
      filters: {
        iso3: 'ITA',
      },
    })
    expect(c).toBeDefined()
    expect(c[0]).toHaveProperty('name')
    expect(c[0].name).toBe('Italy')
    expect(c).toHaveLength(1)
  })
})
