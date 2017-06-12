# hash-handler

[![npm](https://img.shields.io/npm/v/hash-handler.svg)](https://www.npmjs.com/package/hash-handler) [![Travis](https://img.shields.io/travis/lgraubner/hash-handler.svg)](https://travis-ci.org/lgraubner/hash-handler) [![David](https://img.shields.io/david/lgraubner/hash-handler.svg)](https://david-dm.org/lgraubner/hash-handler)

> Handle location hash query strings with ease.

Aims to make working with location hash and query strings easier. Get and set query strings as simple objects and listen for hash changes. Query string arguments get sorted to guarantee consistent URL's.

## Table of contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [License](#license)

## Install

This module is available on [npm](https://www.npmjs.com/).

```
$ npm install hash-handler
```

If you are using some kind of bundler ([webpack](https://webpack.js.org), [rollup](https://rollupjs.org)...) you can import it like this:

```JavaScript
// ES6
import Hash from 'hash-handler';

// CommonJS
var Hash = require('hash-handler');
```

The [UMD](https://github.com/umdjs/umd) build is also available on [unpkg](https://unpkg.com/):

```HTML
<script src="https://unpkg.com/hash-handler/dist/hashHandler.js"></script>
```

## Usage

```JavaScript
import Hash from 'hash-handler';

const hash = Hash();

// set hash value(s)
hash.set({
  age: 5
});

// set more hash values
hash.set({
  color: 'blue'
});

// get hash query string object
console.log(hash.get()); // => { age: 5, color: 'blue' }

// replace whole hash
hash.replace({
  age: 7
});

console.log(hash.get()); // => { age: 7 }

const handler = () => {
  // do stuff
};

// listen for hash changes
hash.registerListener(handler);

// stop listening
hash.removeListener(handler);

// remove all handlers and event listener
hash.destroy();
```

## API

### Hash()

Initializes hash-handler instance.

```JavaScript
const hash = Hash();
```

### Hash.get()

Returns parsed query string hash.

```JavaScript
// http://www.example.com/#name=max
console.log(hash.get()); // => { name: 'max' }
```

### Hash.set(newHash)

Sets the hash query string. Extends existing key value pairs.

```JavaScript
hash.set({
  name: 'max'
}); // http://example.com/#name=max
```

### Hash.replace(newHash)

Replace existing hash query string.

```JavaScript
hash.replace({
  animal: 'shark'
});
```

### Hash.clear()

Removes the hash fragment. The hash itself will remain.

```JavaScript
hash.clear();
```

### Hash.registerListener(handler)

Registers a handler to be executed on hash change.

```JavaScript
hash.registerListener((hash) => {
    // called everytime hash changes
    console.log(hash); // new hash
});
```

### Hash.removeListener(handler)

Removes registered listener function.

```JavaScript
hash.removeListener(handler);
```
### Hash.destroy()

Remove all handlers and hashchange event listener.

```JavaScript
hash.destroy();
```

## License

[MIT](https://github.com/lgraubner/mqr/blob/master/LICENSE) © [Lars Graubner](https://larsgraubner.com)
