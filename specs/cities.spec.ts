import { Cities } from '../src'

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
})
