// @flow

/* eslint no-param-reassign:0 */
// $FlowFixMe
import queryString from 'query-string';

/** hash-handler: Simple hash manipulation
 * @name hash-handler
 * @returns {hash}
 */
export default function hashHandler() {
  const handlers = [];

  // set window hash
  const setLocationHash = newHash => {
    let hashVal = newHash;
    if (typeof hashVal === 'object') {
      // sort by keys
      hashVal = Object.keys(hashVal).sort().reduce((r, k) => {
        // $FlowFixMe
        r[k] = hashVal[k];
        return r;
      }, {});

      // stringify object
      hashVal = queryString.stringify(hashVal);
    }

    location.hash = String(hashVal);
  };

  // get window hash and parse it
  const getParsedHash = () => queryString.parse(location.hash);

  // hashchange event handler
  const handleHashchange = () => {
    const parsedHash = getParsedHash();
    handlers.forEach(handle => {
      handle(parsedHash);
    });
  };

  // add listener
  window.addEventListener('hashchange', handleHashchange);

  return {
    /**
     * Get current hash.
     *
     * @param {String} key     Hash query string key
     * @return {Object|String} Hash object or single value
     */
    get() {
      // return parsed hash
      return getParsedHash();
    },

    /**
     * Extend current hash with object values.
     *
     * @param {Object} newHash
     */
    set(newHash: { [string]: any }) {
      // merge with existing hash
      const parsedHash = getParsedHash();
      setLocationHash(Object.assign(parsedHash, newHash));
    },

    /**
     * Replace current hash.
     *
     * @param {Object} newHash
     */
    replace(newHash: string | { [string]: any }) {
      setLocationHash(newHash);
    },

    /**
     * Clear hash.
     */
    clear() {
      // clear hash, # will also remain
      setLocationHash('');
    },

    /**
     * Register hashchange event handler.
     *
     * @param {Function} handler
     */
    registerListener(handler: Function) {
      // register handler and handlers it
      handlers.push(handler);
    },

    /**
     * Remove hashchange event handler.
     *
     * @param {Function} handler
     */
    removeListener(handler: Function) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        // remove handler from handlers
        handlers.splice(index, 1);
      }
    },

    /**
     * Remove all event listeners.
     */
    destroy() {
      // remove event listener
      window.removeEventListener('hashchange', handleHashchange);
      // clear handler handlers
      handlers.length = 0;
    },
  };
}
