// @flow
// $FlowFixMe
import queryString from 'query-string';

/** hash-handler: Simple hash manipulation
 * @name hash-handler
 * @returns {hash}
 */
export default function hash() {
  const all = [];

  // set window hash
  const setHash = newHash => {
    let hashVal = newHash;
    if (typeof hashVal === 'object') {
      // stringify object
      hashVal = queryString.stringify(hashVal);
    }

    location.hash = hashVal;
  };

  // get window hash and parse it
  const getParsedHash = () => queryString.parse(location.hash);

  window.addEventListener('hashchange', () => {
    const parsedHash = getParsedHash();
    all.forEach(handle => {
      handle(parsedHash);
    });
  });

  return {
    get(...args: any[]) {
      const parsedHash = getParsedHash();

      if (args.length && typeof args[0] === 'string') {
        // return hash value by key
        return parsedHash[String(args[0])];
      }

      // return parsed hash
      return parsedHash;
    },

    set(...args: any[]) {
      const plainHash = args[0] || '';
      const parsedHash = getParsedHash();

      if (typeof args[0] === 'string') {
        if (args.length === 2) {
          // set key/value pair to existing query
          parsedHash[String(args[0])] = args[1];

          setHash(parsedHash);
        } else {
          // set simple string
          setHash(plainHash);
        }
      } else if (typeof args[0] === 'object') {
        setHash(Object.assign(parsedHash, args[0]));
      }
    },

    clear() {
      // clear hash, # will also remain
      setHash('');
    },

    listen(handler: Function) {
      // register handler and store it
      all.push(handler);
    },

    remove(handler: Function) {
      const index = all.indexOf(handler);
      if (index !== -1) {
        // remove handler from store
        all.splice(index, 1);
      }
    },
  };
}
