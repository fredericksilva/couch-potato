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
    this.context = context;

    this.attribute = this.options.attribute || 'data-couch-potato';
    this.shouldRemoveDataAttribute = this.options.shouldRemoveDataAttribute || true
    this.trigger = this.options.trigger || function() {};

    this.source = this.context.getAttribute(this.options.attribute);

    // Setup trigger function
    this.trigger.call(this, this.context, this.source);
  }

  /**
   * Actually make the image request.
   * @return {CouchPotato} CouchPotato instance.
   */
  CouchPotato.prototype.load = function() {
    this.context.setAttribute('src', this.source);

    if (this.shouldRemoveDataAttribute) {
      this.context.removeAttribute(this.attribute);
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
