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

Install HashHandler via NPM or download it [here](dist/HashHandler.min.js).

```Bash
npm install hash-handler
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

## API

This module offers several methods to alter the hash fragment. Use it as follows:

```JavaScript
HashHandler.set("foo");
```

### clear

Removes all values from the hash. The hash itself will remain!

```JavaScript
HashHandler.clear();
```

### get

Returns current hash fragment.

```
http://www.example.com/#bar
```

```JavaScript
console.log(HashHandler.get()); // bar
```

### set

Sets the hash fragment.

```JavaScript
HashHandler.set("foo"); // http://example.com/#foo
```

### listen

Registers a function to listen for hash changes.

```JavaScript
var listener = HashHandler.listen(function(fragment) {
    console.log(fragment); // current hash fragment
});
```

You can also listen for specific hash fragments by specifying a string or regex:

```JavaScript
var listener = HashHandler.listen("foo", function(fragment) {
    // called if hash fragment matches "foo"
});
```

### unlisten

Removes listener function.

```JavaScript
HashHandler.unlisten(listener);
```
