# HashHandler

[![Travis](https://img.shields.io/travis/lgraubner/hash-handler.svg)](https://travis-ci.org/lgraubner/hash-handler) [![David Dev](https://img.shields.io/david/dev/lgraubner/hash-handler.svg)](https://david-dm.org/lgraubner/hash-handler#info=devDependencies) [![npm](https://img.shields.io/npm/v/hash-handler.svg)](https://www.npmjs.com/package/hash-handler)

> Simple handler for URI hashes.

This module aims to make working with URI hashes easier. **This is not meant for complex single page app routings!** Make sure to comply the Googles AJAX crawling theme  [specification](https://developers.google.com/webmasters/ajax-crawling/docs/specification) if you provide content via AJAX which should be crawled.

## Dependencies

None.

## Supported Browsers

* Chrome 10+
* Firefox 6+
* Safari 5.1+
* IE 9+

## Usage

Install HashHandler via NPM or download it [here](https://raw.githubusercontent.com/lgraubner/hash-handler/master/dist/HashHandler.min.js).

```Bash
npm install hash-handler --save
```

**Classic**

Include `HashHandler.min.js` before the closing `body` tag.

```HTML
<script src="node_modules/hash-handler/dist/HashHandler.min.js"></script>
```

**CommonJS**

```JavaScript
var HashHandler = require("hash-handler");
```

The handler is provided as a singleton to avoid side effects. Get the instance and start right away.

```JavaScript
var hash = HashHandler.getInstance();
```

## API

This module offers several methods to alter the hash fragment.

### clear

Removes the hash fragment. The hash itself will remain!

```JavaScript
hash.clear();
```

### get

Returns current hash fragment.

```JavaScript
// http://www.example.com/#bar
console.log(hash.get()); // bar
```

You can enable very simple query string parsing like this:

```JavaScript
// http://www.example.com/#foo=bar&num=2&hello
console.log(hash.get(true));
// => { foo: 'bar', num: '2', hello: true }
```

This will not convert any types. To have a more flexible query string parsing use a library like [`query-string`](https://github.com/sindresorhus/query-string) and use only `hash.get()`.

### set

Sets the hash fragment.

```JavaScript
hash.set("foo"); // http://example.com/#foo
```

### listen

Registers a function to listen for hash changes.

```JavaScript
var listener = hash.listen(function(hash, parsedHash) {
    console.log(hash); // current hash fragment
    console.log(parsedHash); // parsed query string
});
```

You can also listen for a specific hash by specifying a string as first argument:

```JavaScript
var listener = hash.listen("foo", function(hash) {
    // called if hash fragment matches "foo"
});
```

### unlisten

Removes listener function.

```JavaScript
hash.unlisten(listener);
```
