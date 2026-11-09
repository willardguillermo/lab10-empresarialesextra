import "@testing-library/jest-dom/vitest";

// Node 22+ ships its own `localStorage` global, undefined without --localstorage-file, which can
// hide jsdom's (seen with Node 26). Only in that case, tests get an equivalent in-memory Storage.
if (typeof window !== "undefined" && !window.localStorage) {
  const data = new Map();
  const memoryStorage = {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: (key) => data.delete(key),
    clear: () => data.clear(),
    key: (index) => [...data.keys()][index] ?? null,
    get length() { return data.size; },
  };
  Object.defineProperty(window, "localStorage", { value: memoryStorage, configurable: true });
}

// Every test starts with an empty browser storage: persistence must never leak between tests.
beforeEach(() => {
  window.localStorage.clear();
});
