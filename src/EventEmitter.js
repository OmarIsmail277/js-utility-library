// ─── Event Emitter (Final Boss) ───────────────────────

// 14. EventEmitter
function createEventEmitter() {
  const listeners = {};

  return {
    // .on(event, callback)   — register a listener
    on(event, callback) {
      if (!listeners[event]) {
        listeners[event] = [];
      }
      listeners[event].push(callback);
    },

    // .off(event, callback)  — remove a listener
    off(event, callback) {
      const listener = listeners[event];
      const newListeners = [];

      if (listener) {
        for (let i = 0; i < listeners[event].length; i++) {
          if (listener[i] !== callback) {
            newListeners.push(listener[i]);
          }
        }
      }
      listeners[event] = newListeners;
    },

    // .emit(event, ...args)  — trigger all listeners for an event
    emit(event, ...args) {
      const listener = listeners[event];

      if (listener) {
        for (let i = 0; i < listeners[event].length; i++) {
          listener[i].apply(null, args);
        }
      }
    },

    // .once(event, callback) — listener fires only once then removes itself
    once(event, callback) {
      const wrapper = (...args) => {
        emiiter.off(event, wrapper);
        callback(...args);
      };
      emitter.on(event, wrapper);
    },
  };
}
