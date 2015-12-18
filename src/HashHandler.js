/**
 * Simple handler for URI hashes.
 *
 * @author Lars Graubner <mail@larsgraubner.de>
 * @version 0.1.1
 * @license MIT
 */

;(function(root, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.HashHandler = factory();
    }
}(this, function() {

    var instance;

    /**
     * Helper function to iterate over an array.
     *
     * @param  {Array}    arr array to iterate over
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
    function isFunction(obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    }

    return function() {
        "use strict";

        /**
         * Constructor
         */
        var HashHandler = function() {
            this.hash = "";
            this.listeners = [];

            this.init();
        };

        /**
         * Get initial hash and register event listener.
         */
        HashHandler.prototype.init = function() {
            this.hash = this._getHashFragment();
            window.addEventListener("hashchange", this._sync.bind(this), false);
        };

        /**
         * Return current hash fragment.
         *
         * @return {String} Hash fragment
         */
        HashHandler.prototype.get = function() {
            return this.hash;
        };

        /**
         * Set hash fragment.
         *
         * @param  {String} fragment    New hash fragment
         * @return {Boolean}            Success
         */
        HashHandler.prototype.set = function(fragment) {
            this.hash = fragment;
            this._onHashChange();
            this._setHashFragment(fragment);

            return true;
        };

        /**
         * Remove hash fragment from URI.
         *
         * @return {Boolean}    Success
         */
        HashHandler.prototype.clear = function() {
            return this.set("");
        };

        /**
         * Adds listener functions.
         *
         * @return {Object} Listener
         */
        HashHandler.prototype.listen = function() {
            var args = arguments;
            var listener = {};

            if (isFunction(args[0])) {
                listener.regex = new RegExp(".*");
                listener.cb = args[0];
            } else if (isFunction(args[1])) {
                listener.regex = new RegExp("^" + args[0] + "$");
                listener.cb = args[1];
            }

            this.listeners.push(listener);
            return listener;
        };

        /**
         * Removes listener function.
         *
         * @return {Boolean}    Success
         */
        HashHandler.prototype.unlisten = function(listener) {
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
        HashHandler.prototype._getHashFragment = function() {
            return window.location.hash.replace(/^#?/, "");
        };

        /**
         * Set URI hash fragment.
         *
         * @param  {String} fragment    New hash fragment
         */
        HashHandler.prototype._setHashFragment = function(fragment) {
            window.location.hash = "#" + fragment;
        };

        /**
         * Hash change event listener.
         */
        HashHandler.prototype._onHashChange = function() {
            var hash = this.hash;
            each(this.listeners, function(listener) {
                if (listener.regex.test(hash) || listener.trigger === "default") {
                    listener.cb.call(window, hash);
                }
            });
        };

        /**
         * Synchronizes local hash with URI hash fragment.
         */
        HashHandler.prototype._sync = function() {
            var fragment = this._getHashFragment();

            if (this.hash !== fragment) {
                this.hash = fragment;
                this._onHashChange();
            }
        };

        /**
         * Singleton, return existing instance or create a new one.
         */
        if (!instance) {
            instance = new HashHandler();
        }

        return instance;

    }();
}));
