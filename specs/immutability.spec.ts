import { Cities, Countries, States } from '../src'

/**
 * The services hand out the canonical bundled objects rather than copies, so
 * a caller mutating a result used to corrupt the data for every later call in
 * the process — `Cities` worst of all, since it memoises. The data is frozen
 * at load, so the attempt now throws instead of silently poisoning the cache.
 */
describe('returned data is immutable', () => {
  it('refuses mutation of a country and keeps later calls intact', () => {
    const first = Countries.getCountries({ filters: { iso2: 'IT' } })
    expect(() => {
      first[0]!.name = 'MUTATED'
    }).toThrow(TypeError)
    expect(Countries.getCountries({ filters: { iso2: 'IT' } })[0]?.name).toBe(
      'Italy'
    )
  })

  it('refuses mutation of a state and keeps later calls intact', () => {
    const first = States.getStates({ filters: { country_code: 'IT' } })
    const original = first[0]!.name
    expect(() => {
      first[0]!.name = 'MUTATED'
    }).toThrow(TypeError)
    expect(States.getStates({ filters: { country_code: 'IT' } })[0]?.name).toBe(
      original
    )
  })

  it('refuses mutation of a cached city and keeps later calls intact', () => {
    const first = Cities.getCities({
      filters: { country_code: 'IT', state_code: 'IM' },
    })
    expect(() => {
      first[0]!.name = 'MUTATED'
    }).toThrow(TypeError)
    expect(
      Cities.getCities({ filters: { country_code: 'IT', state_code: 'IM' } })[0]
        ?.name
    ).toBe('Airole')
  })

  it('freezes nested structures, not just the top level', () => {
    const [italy] = Countries.getCountries({ filters: { iso2: 'IT' } })
    expect(() => {
      italy!.timezones[0]!.zoneName = 'MUTATED'
    }).toThrow(TypeError)
  })

  it('returns a fresh array each call, so sorting cannot disturb the source', () => {
    const a = Countries.getCountries()
    const b = Countries.getCountries()
    expect(a).not.toBe(b)
    Countries.getCountries({ sort: { mode: 'desc' } })
    expect(Countries.getCountries()[0]?.name).toBe(a[0]?.name)
  })

  it('gives locale results as mutable copies that do not touch the source', () => {
    const localised = Countries.getCountries({
      filters: { iso2: 'IT' },
      locale: 'it',
    })
    localised[0]!.name = 'Locally renamed'
    expect(Countries.getCountries({ filters: { iso2: 'IT' } })[0]?.name).toBe(
      'Italy'
    )
  })
})
