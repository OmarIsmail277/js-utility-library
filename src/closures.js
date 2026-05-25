// ─── Closures ─────────────────────────────────────────

// 6. once
// return a wrapper function that only executes fn the first time

function once(fn) {
  let called = false;

  return function (...args) {
    if (!called) {
      called = true;
      // return fn(...args);
      return fn.apply(this, args);
    }
  };
}

// 7. memoize
// return a wrapper that caches results by argument

// 8. createCounter
// use closure to hold private count, return increment/decrement/reset

// 9. createSecretHolder
// use closure to hold private data, return getSecret/setSecret
