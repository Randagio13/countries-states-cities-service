# Countries States Cities Service

## Mission

- I've never found any complete library to get all world countries, states, and cities. I want to develop the best one. Of course, contributors are welcome!!
- I took this [data](https://github.com/dr5hn/countries-states-cities-database) as a starting point.

## Getting started

To get started with this library, you need to install it and add it to your project.

### Installation

Countries States Cities Service is available as an npm package.

```bash
# npm
npm install countries-states-cities-service
# yarn
yarn add countries-states-cities-service
```

### Import

Import single named import as follow:

```typescript
import { Countries, States, Cities } from 'countries-states-cities-service'
```

## Usage

The code snippet below show how to put into action `countries-states-cities-service` in some common use cases.

- [Countries](#countries)
- [States](#states)
- [Cities](#cities)

### Countries

> How to get all countries.

```typescript
const countries = Countries.getCountries()
```

> How to get all countries with localization.

```typescript
const countries = Countries.getCountries({ locale: 'it' })
```

> How to get a country by iso2 code.

```typescript
const countries = Countries.getCountries({ filters: { iso2: 'US' } })
```

> How to get a country by iso2 code and localization.

```typescript
const countries = Countries.getCountries({
  filters: { iso2: 'IT' },
  locale: 'it',
})
```

> How to get a country by iso3 code.

```typescript
const countries = Countries.getCountries({ filters: { iso3: 'ITA' } })
```

### States

> How to get all states.

```typescript
const states = States.getStates()
```

> How to get all states with localization.

```typescript
const states = States.getStates({ locale: 'it' })
```

> How to get states by country code.

```typescript
const states = States.getStates({ filters: { country_code: 'IT' } })
```

> How to get states by country code and localization _(available only for italian states for now)_.

```typescript
const states = States.getStates({
  filters: { country_code: 'IT' },
  locale: 'it',
})
```

> How to get regions by country code _(available only for italian states for now)_.

```typescript
const states = States.getStates({
  filters: {
    country_code: 'IT',
    is_region: true,
  },
})
```

> How to get a state by country code and state code.

```typescript
const states = States.getStates({
  filters: {
    country_code: 'IT',
    state_code: 'GE',
  },
})
```

### Cities

> How to get all cities.

```typescript
const cities = Cities.getCities()
```

> How to get italian cities.

```typescript
const cities = Cities.getCities({
  filters: {
    country_code: 'IT',
  },
})
```

> How to get italian ligurian cities.

```typescript
const cities = Cities.getCities({
  filters: {
    country_code: 'IT',
    state_code: '42', // Region iso2
  },
})
```

## Contributors

Any contribution is really appreciated.

1. Fork [this repository](https://github.com/commercelayer/sanity-template-commercelayer) (learn how to do this [here](https://help.github.com/articles/fork-a-repo)).

2. Clone the forked repository.

3. Make your changes and create a pull request ([learn how to do this](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)).

4. I will attend to your pull request and provide some feedback.

## Need help?

Ping me [on Twitter](https://twitter.com/randagio19)

## License

This repository is licensed under the [MIT](LICENSE) License.

## Sponsor

Don't be shy! 😜
