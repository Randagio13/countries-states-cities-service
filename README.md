<div align="center">

# 🌍 countries-states-cities-service

**The world's geographic data. Zero dependencies. Tree-shakable. TypeScript-first.**

[![npm](https://img.shields.io/npm/v/countries-states-cities-service?style=flat-square&color=cb3837&logo=npm)](https://www.npmjs.com/package/countries-states-cities-service)
[![downloads](https://img.shields.io/npm/dm/countries-states-cities-service?style=flat-square&color=46bc99)](https://www.npmjs.com/package/countries-states-cities-service)
[![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen?style=flat-square)](https://github.com/Randagio13/countries-states-cities-service)
[![license](https://img.shields.io/npm/l/countries-states-cities-service?style=flat-square)](LICENSE)
[![bundle size](https://img.shields.io/badge/cities%20bundle-6.5%20MB-blue?style=flat-square)](https://bundlephobia.com/package/countries-states-cities-service)

<br />

<a href="https://github.com/sponsors/Randagio13">
  <img src="https://img.shields.io/badge/Sponsor%20this%20project-%E2%9D%A4-db61a2?style=for-the-badge&logo=github" alt="Sponsor" />
</a>

</div>

---

## Why this package?

Every address form, user profile, and logistics app needs countries, states, and cities. Most solutions make you choose between incomplete data, bloated bundles, or heavy server-side calls.

**This package gives you all three — fully offline, in one install:**

| | |
|---|---|
| 🌐 **250** countries | with ISO2, ISO3, phone codes, currencies, timezones & translations |
| 🗺️ **4,868** states & regions | with coordinates and locale support |
| 🏙️ **147,418** cities | filtered, sorted, and ready in milliseconds |
| 📦 **Zero** runtime dependencies | fully self-contained |
| 🌲 **Tree-shakable** | import only what you need — countries bundle is just 204 KB |
| 🔷 **TypeScript-first** | full type definitions included |
| ⚡ **CJS + ESM** | works everywhere: Node.js, React, Vue, React Native, Next.js |
| ✅ **100% test coverage** | no surprises in production |

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
import { Countries } from 'countries-states-cities-service/countries' // ~204 KB
import { States }    from 'countries-states-cities-service/states'    // ~584 KB
import { Cities }    from 'countries-states-cities-service/cities'    // ~6.5 MB
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
const usa   = Countries.getCountries({ filters: { iso3: 'USA' } })

// Multiple countries at once
const eu = Countries.getCountries({ filters: { iso2: ['IT', 'FR', 'DE', 'ES'] } })

// Localized names
const countries_it = Countries.getCountries({ locale: 'it' })

// Localized + filtered
const italy_it = Countries.getCountries({ filters: { iso2: 'IT' }, locale: 'it' })

// Sorted
const sorted = Countries.getCountries({ sort: { mode: 'alphabetical', key: 'name' } })
```

**Supported locales:** `kr` `br` `pt` `nl` `hr` `fa` `de` `es` `fr` `ja` `it` `cn`

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
const states = States.getStates({ filters: { country_code: ['IT', 'FR'] } })

// Single state by code
const liguria = States.getStates({ filters: { country_code: 'IT', state_code: 'GE' } })

// Italian regions only
const regions = States.getStates({ filters: { country_code: 'IT', is_region: true } })

// Localized state names
const states_it = States.getStates({ filters: { country_code: 'IT' }, locale: 'it' })

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
const cities = Cities.getCities({ filters: { country_code: ['IT', 'FR'] } })

// Cities by country + state
const ligurian = Cities.getCities({ filters: { country_code: 'IT', state_code: '42' } })

// Sorted
const sorted = Cities.getCities({ sort: { mode: 'alphabetical', key: 'name' } })
```

---

## Sort modes

All three services support the same sort options:

| Mode | Description |
|------|-------------|
| `asc` | Original order (default) |
| `desc` | Reversed order |
| `alphabetical` | Locale-aware alphabetical by any key |

```typescript
{ sort: { mode: 'alphabetical', key: 'name' } }
{ sort: { mode: 'asc' } }
{ sort: { mode: 'desc' } }
```

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
