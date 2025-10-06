export function uniqueByKeys(arr, ...keys) {
  const seen = new Set();
  return arr.filter((item) => {
    const key = keys.map((key) => item[key] || '').join('-');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
