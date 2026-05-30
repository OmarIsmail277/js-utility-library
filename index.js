// ─── Entry Point ──────────────────────────────────────
// re-export everything from src/ so the library has a single import point

export {
  customMap,
  customFilter,
  customReduce,
  groupBy,
  flattenArray,
} from "./src/arrays.js";
export {
  once,
  memoize,
  createCounter,
  createSecretHolder,
} from "./src/closures.js";
export { compose, deepClone } from "./src/functions.js";
export { pipeAsync } from "./src/async.js";
export { createEventEmitter } from "./src/EventEmitter.js";
