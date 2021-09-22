export function dataFiltered<D, F extends keyof D>(
  data: D[],
  filters: Record<F, any>
): D[] {
  for (const filter of Object.keys(filters)) {
    data = data.filter(item => filters[filter as F] === item[filter as F])
  }
  return data
}
