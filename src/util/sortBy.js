export function sortBy(array, key, ascending = true) {
  return array.slice().sort((a, b) => {
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0;
  });
}

export function sortByKeys(array, keys, ascending = true) {
  return array.slice().sort((a, b) => {
    for (const key of keys) {
      if (a[key] < b[key]) return ascending ? -1 : 1;
      if (a[key] > b[key]) return ascending ? 1 : -1;
    }
    return 0;
  });
}
