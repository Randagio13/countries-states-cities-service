import { defineConfig } from 'tsdown'

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
  // Auto-generate and keep package.json's `exports`, `main`, `module` and
  // `types` fields in sync with the emitted files on every build.
  exports: true,
  clean: true,
  minify: true,
  sourcemap: true,
  treeshake: true,
})
