/**
 * Shrinks geographic data files for minimal bundle size.
 *
 * cities.json transformations (applied in order, each idempotent):
 *   Pass 1: array-of-objects → columnar {fields, data} with 4dp float coords
 *   Pass 2: columnar float coords → lookup tables + integer coords ×10000
 *            removes redundant state_id/country_id from each row
 *
 * states.json / countries.json: coordinate strings rounded to 4dp
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const dir = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data')
const read = f => JSON.parse(readFileSync(`${dir}/${f}`, 'utf8'))
const write = (f, data) => writeFileSync(`${dir}/${f}`, JSON.stringify(data))
const round4 = v => Math.round(parseFloat(v) * 1e4) / 1e4
const round4str = v => (v == null ? null : String(round4(v)))

// --- Cities ---

let cities = read('cities.json')

// Pass 1: raw array-of-objects → intermediate columnar (if needed)
if (Array.isArray(cities)) {
  cities = {
    fields: ['id', 'name', 'state_id', 'state_code', 'country_id', 'country_code', 'latitude', 'longitude'],
    data: cities.map(c => [c.id, c.name, c.state_id, c.state_code, c.country_id, c.country_code, round4(c.latitude), round4(c.longitude)]),
  }
  console.log(`cities.json  pass 1: array-of-objects → intermediate columnar`)
}

// Pass 2: intermediate columnar → packed with lookup tables + integer coords
if (!('cc' in cities)) {
  const rows = cities.data
  // Build lookup tables from the data
  const ccSet = []
  const ccIndex = {}
  const ci = {}
  const si = {}

  for (const [, , state_id, state_code, country_id, country_code] of rows) {
    if (!(country_code in ccIndex)) {
      ccIndex[country_code] = ccSet.length
      ccSet.push(country_code)
      ci[country_code] = country_id
    }
    const key = `${country_code}:${state_code}`
    if (!(key in si)) si[key] = state_id
  }

  const packed = {
    cc: ccSet,
    ci,
    si,
    data: rows.map(([id, name, , state_code, , country_code, lat, lon]) => [
      id,
      name,
      state_code,
      ccIndex[country_code],
      Math.round(lat * 10000),
      Math.round(lon * 10000),
    ]),
  }

  write('cities.json', packed)
  const before = JSON.stringify(cities).length
  const after = JSON.stringify(packed).length
  console.log(`cities.json  pass 2: ${(before / 1024 / 1024).toFixed(2)} MB → ${(after / 1024 / 1024).toFixed(2)} MB (saved ${((before - after) / 1024).toFixed(0)} KB)`)
} else {
  console.log('cities.json already fully optimised, skipping')
}

// --- States ---
const states = read('states.json')
write('states.json', states.map(s => ({
  ...s,
  latitude: round4str(s.latitude),
  longitude: round4str(s.longitude),
})))
console.log(`states.json  ${states.length.toLocaleString()} records → 4dp coords`)

// --- Countries ---
const countries = read('countries.json')
write('countries.json', countries.map(c => ({
  ...c,
  latitude: round4str(c.latitude),
  longitude: round4str(c.longitude),
})))
console.log(`countries.json  ${countries.length} records → 4dp coords`)
