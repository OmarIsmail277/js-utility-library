// ─── Functions ────────────────────────────────────────

// 10. compose
// take multiple functions, return a new function that runs them right-to-left

const compose = (...fns) => {
  return function (value) {
    return fns.reduceRight((acc, fn) => fn(acc), value);
  };
};

// 11. deepClone
// recursively clone objects and arrays without mutating the original

function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  const clone = Array.isArray(obj) ? [] : {};

  for (const key of Object.keys(obj)) {
    clone[key] = deepClone(obj[key]);
  }

  return clone;
}
