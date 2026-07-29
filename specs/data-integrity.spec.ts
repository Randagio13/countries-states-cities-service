import packedCities from '../src/data/cities.json'
import countries from '../src/data/countries.json'
import states from '../src/data/states.json'

/**
 * The cities payload is packed: per-row `state_id`/`country_id` are dropped and
 * rebuilt from lookup tables keyed on `country_code` and `country_code:state_code`.
 * That is only lossless while those keys stay unique, and `src/cities.ts` asserts
 * the lookups always hit (`si[...]!`, `ci[...]!`).
 *
 * Nothing in the pipeline enforces either property, so a regenerated dataset
 * could silently mis-assign every city in an affected state. These tests turn
 * that into a build failure instead.
 */
describe('bundled data integrity', () => {
  const packed = packedCities as unknown as {
    cc: string[]
    ci: Record<string, number>
    si: Record<string, number>
    data: [number, string, string, number, number, number][]
  }

  it('keys the state lookup uniquely, so packing is lossless', () => {
    const seen = new Map<string, string>()
    const collisions: string[] = []

    for (const state of states) {
      const key = `${state.country_code}:${state.state_code}`
      const previous = seen.get(key)
      if (previous !== undefined) {
        collisions.push(`${key} -> ${previous} vs ${state.name}`)
      } else {
        seen.set(key, state.name)
      }
    }

    expect(collisions).toEqual([])
  })

  it('resolves every city to a real country and state', () => {
    const countryIds = new Set(countries.map(c => c.id))
    const stateIds = new Set(states.map(s => s.id))
    const unresolved: string[] = []

    for (const [id, name, state_code, cc_idx] of packed.data) {
      const country_code = packed.cc[cc_idx]
      if (country_code === undefined) {
        unresolved.push(`${id} ${name}: country_code index ${cc_idx}`)
        continue
      }
      if (!countryIds.has(packed.ci[country_code] as number)) {
        unresolved.push(`${id} ${name}: country_id for ${country_code}`)
      }
      const stateId = packed.si[`${country_code}:${state_code}`]
      if (stateId === undefined || !stateIds.has(stateId)) {
        unresolved.push(
          `${id} ${name}: state_id for ${country_code}:${state_code}`
        )
      }
    }

    expect(unresolved).toEqual([])
  })

  it('references only country codes that exist in the countries dataset', () => {
    const iso2 = new Set(countries.map(c => c.iso2))
    expect(packed.cc.filter(code => !iso2.has(code))).toEqual([])
  })

  it('links every state to a real country', () => {
    const countryIds = new Set(countries.map(c => c.id))
    const iso2 = new Set(countries.map(c => c.iso2))
    expect(states.filter(s => !countryIds.has(s.country_id))).toEqual([])
    expect(states.filter(s => !iso2.has(s.country_code))).toEqual([])
  })

  it('keeps every packed coordinate within valid bounds', () => {
    const outOfRange = packed.data.filter(([, , , , lat, lon]) => {
      const latitude = lat / 10000
      const longitude = lon / 10000
      return (
        latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180
      )
    })
    expect(outOfRange).toEqual([])
  })
})
