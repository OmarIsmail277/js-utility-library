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

function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log("Cache HIT!");
      return cache.get(key);
    }
    console.log("Cache MISS");
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const squre = memoize((x) => x * x);

// 8. createCounter
// use closure to hold private count, return increment/decrement/reset

function createCounter(action) {
  let counter = 0;

  return function (action) {
    if (action === "increment") counter++;
    if (action === "decrement") counter--;
    if (action === "reset") counter = 0;
    return counter;
  };
}

// 9. createSecretHolder
// use closure to hold private data, return getSecret/setSecret

function createSecretHolder() {
  let mySecret = "My Password";

  return {
    getSecret() {
      return mySecret;
    },
    setSecret(newValue) {
      mySecret = newValue;
    },
  };
}

const holder = createSecretHolder();

const x = holder.getSecret();
console.log(x);

holder.setSecret("New Password");
const y = holder.getSecret();
console.log(y);

// Try to access it
// console.log(holder.secret); // undefined
