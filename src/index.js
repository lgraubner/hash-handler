// @flow
// $FlowFixMe
import queryString from 'query-string';

/** hash-handler: Simple hash manipulation
 * @name hash-handler
 * @returns {hash}
 */
export default function hash() {
  const all = [];

  function setHash(newHash) {
    if (typeof newHash === 'object') {
      // stringify object
      // eslint-disable-next-line
      newHash = queryString.stringify(newHash);
    }

    location.hash = newHash;
  }

  function getParsedHash() {
    return queryString.parse(location.hash);
  }

  return {
    get(...args: any[]) {
      if (args.length) {
        const parsedHash = getParsedHash();

        if (args[0] === true) {
          // return parsed hash
          return parsedHash;
        }

        // return hash value by key
        return parsedHash[String(args[0])];
      }

      // return raw hash
      return location.hash.substr(1);
    },

    set(...args: any[]) {
      const plainHash = args[0] || '';
      const parsedHash = getParsedHash();

      if (args.length === 2) {
        // set key/value pair to existing query
        parsedHash[String(args[0])] = args[1];

        setHash(parsedHash);
      } else if (args.length === 1 && typeof args[0] === 'object') {
        // assign object to existing hash key/vals
        setHash(Object.assign(parsedHash, args[0]));
      } else {
        // set simple string
        setHash(plainHash);
      }
    },

    clear() {
      // clear hash, # will also remain
      setHash('');
    },

    listen(handler: Function) {
      // register handler and store it
      window.addEventListener('hashchange', handler);
      all.push(handler);
    },

    remove(handler: Function) {
      const index = all.indexOf(handler);
      if (index !== -1) {
        // remove handler from store
        window.removeEventListener('hashchange', handler);
        all.splice(index, 1);
      }
    },
  };
}
