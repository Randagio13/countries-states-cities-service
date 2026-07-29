<div align="center">

# 🌍 countries-states-cities-service

**The world's geographic data. Zero dependencies. Tree-shakable. TypeScript-first.**

[![npm](https://img.shields.io/npm/v/countries-states-cities-service?style=flat-square&color=cb3837&logo=npm)](https://www.npmjs.com/package/countries-states-cities-service)
[![downloads](https://img.shields.io/npm/dm/countries-states-cities-service?style=flat-square&color=46bc99)](https://www.npmjs.com/package/countries-states-cities-service)
[![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen?style=flat-square)](https://github.com/Randagio13/countries-states-cities-service)
[![license](https://img.shields.io/npm/l/countries-states-cities-service?style=flat-square)](LICENSE)
[![bundle size](https://img.shields.io/badge/cities%20bundle-6.9%20MB-blue?style=flat-square)](https://bundlephobia.com/package/countries-states-cities-service)

<br />

<a href="https://github.com/sponsors/Randagio13">
  <img src="https://img.shields.io/badge/Sponsor%20this%20project-%E2%9D%A4-db61a2?style=for-the-badge&logo=github" alt="Sponsor" />
</a>

</div>

---

## Why this package?

Every address form, user profile, and logistics app needs countries, states, and cities. Most solutions make you choose between incomplete data, bloated bundles, or heavy server-side calls.

**This package gives you all three — fully offline, in one install:**

|                                  |                                                                    |
| -------------------------------- | ------------------------------------------------------------------ |
| 🌐 **250** countries             | with ISO2, ISO3, phone codes, currencies, timezones & translations |
| 🗺️ **5,308** states & regions    | with coordinates and locale support                                |
| 🏙️ **156,025** cities            | filtered, sorted, and ready in milliseconds                        |
| 📦 **Zero** runtime dependencies | fully self-contained                                               |
| 🌲 **Tree-shakable**             | import only what you need — countries bundle is just 222 KB        |
| 🔷 **TypeScript-first**          | full type definitions included                                     |
| ⚡ **CJS + ESM**                 | works everywhere: Node.js, React, Vue, React Native, Next.js       |
| ✅ **100% test coverage**        | no surprises in production                                         |

---

## Installation

```bash
npm install countries-states-cities-service
# or
pnpm add countries-states-cities-service
# or
yarn add countries-states-cities-service
```

---

## Import — only pay for what you use

The package ships with **subpath exports** so bundlers and mobile frameworks (Metro, webpack, Vite) only include the data you actually import.

```typescript
// Full package — all data
import { Countries, States, Cities } from 'countries-states-cities-service'

// Per-service — only loads what you need
import { Countries } from 'countries-states-cities-service/countries' // ~222 KB (58 KB gzipped)
import { States } from 'countries-states-cities-service/states' // ~666 KB (125 KB gzipped)
import { Cities } from 'countries-states-cities-service/cities' // ~6.9 MB (2.4 MB gzipped)
```

> On React Native? Use the subpath imports. Your users will thank you.

---

## Usage

### Countries

```typescript
import { Countries } from 'countries-states-cities-service'

// All countries
const countries = Countries.getCountries()

// Filter by ISO2 or ISO3
const italy = Countries.getCountries({ filters: { iso2: 'IT' } })
const usa = Countries.getCountries({ filters: { iso3: 'USA' } })

// Multiple countries at once
const eu = Countries.getCountries({
  filters: { iso2: ['IT', 'FR', 'DE', 'ES'] },
})

// Localized names
const countries_it = Countries.getCountries({ locale: 'it' })

// Localized + filtered
const italy_it = Countries.getCountries({
  filters: { iso2: 'IT' },
  locale: 'it',
})

// Sorted
const sorted = Countries.getCountries({
  sort: { mode: 'alphabetical', key: 'name' },
})
```

**Supported locales:** `ar` `br` `de` `es` `fa` `fr` `hi` `hr` `it` `ja` `ko` `nl` `pl` `pt` `pt-BR` `ru` `tr` `uk` `zh-CN`

`kr` and `cn` are still accepted as deprecated aliases for `ko` and `zh-CN`.
Upstream renamed them, so in earlier versions those two matched nothing in the
data and silently returned the untranslated name — they now resolve correctly.

> **Note:** only country names are translated for every locale. State
> translations exist for `it` alone; every other locale falls back to the
> canonical state name. Cities are not translated.

<details>
<summary>Country object shape</summary>

```typescript
interface Country {
  id: number
  name: string
  iso2: string
  iso3: string
  numeric_code: string
  phone_code: string
  capital: string
  currency: string
  currency_symbol: string
  tld: string
  native: string
  region: string
  subregion: string
  latitude: string
  longitude: string
  emoji: string
  emojiU: string
  timezones: Array<{
    zoneName: string
    gmtOffset: number
    gmtOffsetName: string
    abbreviation: string
    tzName: string
  }>
  translations: Partial<Record<TranslationLocale, string>>
}
```

</details>

---

### States

```typescript
import { States } from 'countries-states-cities-service'

// All states
const states = States.getStates()

// States by country
const it_states = States.getStates({ filters: { country_code: 'IT' } })

// Filter by multiple countries
const it_fr_states = States.getStates({
  filters: { country_code: ['IT', 'FR'] },
})

// Single state by code
const genoa = States.getStates({
  filters: { country_code: 'IT', state_code: 'GE' },
})

// Italian regions only
const regions = States.getStates({
  filters: { country_code: 'IT', is_region: true },
})

// Localized state names
const states_it = States.getStates({
  filters: { country_code: 'IT' },
  locale: 'it',
})

// Sorted
const sorted = States.getStates({ sort: { mode: 'alphabetical', key: 'name' } })
```

---

### Cities

```typescript
import { Cities } from 'countries-states-cities-service'

// All cities
const cities = Cities.getCities()

// Cities by country
const it_cities = Cities.getCities({ filters: { country_code: 'IT' } })

// Cities by multiple countries
const it_fr_cities = Cities.getCities({
  filters: { country_code: ['IT', 'FR'] },
})

// Cities by country + state
const genoese = Cities.getCities({
  filters: { country_code: 'IT', state_code: 'GE' },
})

// Sorted
const sorted = Cities.getCities({ sort: { mode: 'alphabetical', key: 'name' } })
```

> **Match cities on a province, not a region.** Some `state_code` values are
> regions (`is_region: true`) that sit above the provinces cities are actually
> keyed to — filtering cities by Liguria's `'42'` returns nothing, while its
> provinces (`'GE'`, `'IM'`, `'SP'`, `'SV'`) return results.

---

## Sort modes

All three services support the same sort options:

| Mode           | Description                                          |
| -------------- | ---------------------------------------------------- |
| `asc`          | Bundled order, unchanged (default)                   |
| `desc`         | Bundled order reversed — **not** a descending sort    |
| `alphabetical` | Locale-aware ascending sort by any key               |

```typescript
{ sort: { mode: 'alphabetical', key: 'name' } }
{ sort: { mode: 'asc' } }
{ sort: { mode: 'desc' } }
```

> **`desc` reverses, it does not sort.** It hands back the bundled order
> backwards. Countries and states happen to ship name-ordered, so there `desc`
> looks like reverse-alphabetical — but cities ship grouped by state and
> alphabetical *within* each state, so reversing them is not a global ordering.
> For a genuine descending sort, sort ascending and reverse the result:
>
> ```typescript
> const zToA = Cities.getCities({ sort: { mode: 'alphabetical', key: 'name' } }).reverse()
> ```

---

## Immutability

Results are fresh arrays, but the objects inside are the canonical bundled
records and are **frozen**. Read them freely; derive instead of mutating:

```typescript
const [italy] = Countries.getCountries({ filters: { iso2: 'IT' } })

italy.name = 'Italia' // ✗ TypeError — the bundled data is frozen
const renamed = { ...italy, name: 'Italia' } // ✓ derive a copy
```

In earlier versions that assignment silently succeeded and corrupted the data
for every later call in the process — `Cities` worst of all, since it memoises.

---

## Data source

Geographic data is sourced from [dr5hn/countries-states-cities-database](https://github.com/dr5hn/countries-states-cities-database) and bundled at build time — no network calls, no external API, no rate limits.

---

## Contributing

Contributions are always welcome! Here's how:

1. [Fork the repository](https://github.com/Randagio13/countries-states-cities-service/fork)
2. Create your branch: `git checkout -b feat/my-improvement`
3. Make your changes and add tests
4. Open a pull request — I review quickly

---

## Support & feedback

Have a question or found a bug? Ping me on [Twitter / X](https://twitter.com/randagio19) or [open an issue](https://github.com/Randagio13/countries-states-cities-service/issues).

---

## License

[MIT](LICENSE) © [Alessandro Casazza](https://github.com/Randagio13)

---

<div align="center">

## Sponsor this project

This package is free and maintained in my spare time.  
If it saves you hours of work, consider buying me a coffee ☕

<a href="https://github.com/sponsors/Randagio13">
  <img src="https://img.shields.io/badge/Become%20a%20Sponsor-%E2%9D%A4-db61a2?style=for-the-badge&logo=github&logoColor=white" alt="Become a Sponsor" />
</a>

**Every sponsorship — no matter the size — keeps this project alive and growing.**  
Your name/logo can appear right here. [Let's talk.](https://github.com/sponsors/Randagio13)

</div>
