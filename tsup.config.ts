import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    countries: 'src/countries.ts',
    states: 'src/states.ts',
    cities: 'src/cities.ts',
  },
  outDir: 'lib',
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  minify: true,
  sourcemap: true,
  treeshake: true,
})
