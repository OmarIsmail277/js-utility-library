// ─── Async ────────────────────────────────────────────

// 12. pipeAsync
// take multiple async functions, pipe output of each into the next (left-to-right)

const pipe =
  (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);

const pipeAsync =
  (...fns) =>
  (value) =>
    fns.reduce(async (accPromise, fn) => {
      const acc = await accPromise;
      return fn(acc);
    }, Promise.resolve(value));
