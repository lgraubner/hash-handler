/**
 * Simple handler for URI hashes.
 *
 * @author Lars Graubner <mail@larsgraubner.de>
 * @version 1.5.0
 * @license MIT
 */
(function (root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    root.HashHandler = factory();
  }
}(this, function () {
  var instance;

  /**
   * Helper function to iterate over an array.
   *
   * @param  {Array}  arr array to iterate over
   * @param  {Function} fn  callback function
   */
  function each(arr, fn) {
    var i;
    for (i = 0; i < arr.length; i++) {
      fn(arr[i], i);
    }
  }

  /**
   * Helper function to check if object is a function.
   *
   * @param  {Object}  obj object to check
   * @return {Boolean}
   */
  function isfunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  }

  /**
   * Simple query string parser.
   *
   * @param  {string} str hash string
   * @return {Object}     parsed query string object
   */
  function parseQueryString(str) {
    var queryObj = {};
    var items;
    try {
      items = str.split('&');
    } catch (e) {
      items = [];
    }
    if (items.length > 0) {
      queryObj = items.reduce(function (obj, item) {
        var parts = item.split('=');
        var value = parts[1];

        if (!value) {
          value = true;
        }

        obj[parts[0]] = value;

        return obj;
      }, {});
    }

    return queryObj;
  }

  /**
   * Stringify object to query string.
   *
   * @param  {Object} obj
   * @return {String}     stringified object
   */
  function stringify(obj) {
    var parts = [];
    var i;
    for (i in obj) {
      if (obj.hasOwnProperty(i)) {
        parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
      }
    }
    return parts.join('&');
  }


  return (function () {
    'use strict';

    /**
     * Constructor
     */
    var HashHandler = function () {
      this.hash = '';
      this.listeners = [];

      this.init();
    };

    /**
     * Get initial hash and register event listener.
     */
    HashHandler.prototype.init = function () {
      this.hash = this._getHashFragment();
      window.addEventListener('hashchange', this._sync.bind(this), false);
    };

    /**
     * Return current hash fragment.
     *
     * @return {String} Hash fragment
     */
    HashHandler.prototype.get = function (arg) {
      var hash = this.hash;
      var curHashObj = parseQueryString(hash);
      // bool, return parsed object
      if (typeof arg === 'boolean' && arg) {
        if (this.hash !== '') {
          hash = parseQueryString(this.hash);
        } else {
          hash = {};
        }
      } else if (typeof arg === 'string') {
        // return value by key
        hash = curHashObj[arg];
      }
      return hash;
    };

    /**
     * Set hash fragment.
     *
     * @param  {String} fragment  New hash fragment
     * @return {Boolean}      Success
     */
    HashHandler.prototype.set = function () {
      var curHashObj = parseQueryString(this.hash);
      var arg = arguments[0];
      var newHash = arg;

      // key value pair
      if (arguments.length > 1) {
        curHashObj[arg] = arguments[1];
        newHash = stringify(curHashObj);
      } else {
        // single arg object
        if (typeof arg === 'object') {
          newHash = stringify(arg);
        } else if (typeof arg !== 'string') {
          // single arg full hash
          // eslint-disable-next-line
          throw new Error('set() expects either a string or object, ' + typeof arg + ' given.');
        }
      }

      this.hash = newHash;
      this._onHashChange();
      this._setHashFragment(newHash);

      return true;
    };

    /**
     * Remove hash fragment from URI.
     *
     * @return {Boolean}  Success
     */
    HashHandler.prototype.clear = function () {
      return this.set('');
    };

    /**
     * Adds listener functions.
     *
     * @return {Object} Listener
     */
    HashHandler.prototype.listen = function () {
      var args = arguments;
      var listener = {};

      if (isfunction(args[0])) {
        listener.regex = new RegExp('.*');
        listener.cb = args[0];
      } else if (isfunction(args[1])) {
        listener.regex = new RegExp('^' + args[0] + '$');
        listener.cb = args[1];
      }

      this.listeners.push(listener);
      return listener;
    };

    /**
     * Removes listener function.
     *
     * @return {Boolean}  Success
     */
    HashHandler.prototype.unlisten = function (listener) {
      var index = this.listeners.indexOf(listener);

      if (index > -1) {
        this.listeners.splice(index, 1);
        return true;
      }

      return false;
    };

    /**
     * Get hash fragment from  URI.
     *
     * @return {String} Hash fragment
     */
    HashHandler.prototype._getHashFragment = function () {
      return decodeURI(window.location.hash.replace(/^#?/, ''));
    };

    /**
     * Set URI hash fragment.
     *
     * @param  {String} fragment  New hash fragment
     */
    HashHandler.prototype._setHashFragment = function (fragment) {
      window.location.hash = '#' + encodeURI(fragment);
    };

    /**
     * Hash change event listener.
     */
    HashHandler.prototype._onHashChange = function () {
      var hash = this.hash;
      each(this.listeners, function (listener) {
        if (listener.regex.test(hash) || listener.trigger === 'default') {
          listener.cb.call(window, hash, parseQueryString(hash));
        }
      });
    };

    /**
     * Synchronizes local hash with URI hash fragment.
     */
    HashHandler.prototype._sync = function () {
      var fragment = this._getHashFragment();

      if (this.hash !== fragment) {
        this.hash = fragment;
        this._onHashChange();
      }
    };

    /**
     * Singleton, return existing instance or create a new one.
     */
    return {
      getInstance: function () {
        if (!instance) {
          instance = new HashHandler();
        }
        return instance;
      },
    };
  })();
}));
