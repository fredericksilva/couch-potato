/**
 * Couch Potato <http://github.com/netshoes/couch-potato>
 * Released under {license} license
 * Author: Netshoes Front-End Team <atg-fe@netshoes.com>
 * Version: {version}
 */

/* global define */

(function(global) {

  'use strict';

  /**
   * Easy way to lazy load images. Dependency free.
   *
   * @param {HTML Node} context Context to create the instance
   * @param {Object} options Configuration options
   */
  function CouchPotato(context, options) {
    this._log('[CouchPotato] constructor', options);

    // Setup default options
    this.options = this._defaults(options, {
      attribute: 'data-couch-potato',
      shouldRemoveDataAttribute: true,
      trigger: function() {}
    });

    this.context = context;

    // Set `src` to `//:0` by default so the markup is valid
    // See: http://stackoverflow.com/a/5775621/339827
    this.context.setAttribute('src', '//:0');

    this.source = this.context.getAttribute(this.options.attribute);

    // Setup trigger function
    this.options.trigger.call(this, this.context, this.source);
  }

  /**
   * Simple defaults implementation (IE9+), similar to Underscore's `_.default`.
   *
   * @param {Object} object     Original object
   * @param {Object} properties Default properties
   * @return {Object} A new object with the defaults applied to it
   */
  CouchPotato.prototype._defaults = function(object, properties) {
    var keys = Object.keys(properties),
        newObject = Object.create(object);

    keys.forEach(function(key) {
      if(!object.hasOwnProperty(key)) {
        newObject[key] = properties[key];
      }
    });

    return newObject;
  };

  /**
   * Internal logging system.
   */
  CouchPotato.prototype._log = function() {
    var message = Array.prototype.slice.call(arguments);

    if(CouchPotato.DEBUG) {
      console.log.apply(console, message);
    }
  };

  /**
   * Actually make the image request.
   * @return {CouchPotato} CouchPotato instance.
   */
  CouchPotato.prototype.load = function() {
    this._log('[CouchPotato] :: load() :: Lazy load image', this.source);

    this.context.setAttribute('src', this.source);

    if (this.options.shouldRemoveDataAttribute) {
      this.context.removeAttribute(this.options.attribute);
    }

    return this;
  };

  // Debug mode
  CouchPotato.DEBUG = false;

  // Exports to AMD
  if (typeof define === 'function' && define.amd) {
    define(function () { return CouchPotato; });
  // Exports to the browser global context
  } else {
    global.CouchPotato = CouchPotato;
  }

})(this);
