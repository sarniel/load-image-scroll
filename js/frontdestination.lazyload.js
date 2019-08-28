/*
 *
 * Copyright (c) 2013 The Online Leisure Corporation. All rights reserved.
 *
 * Updated: 16-July-2019
 *
 */

 (function ($) {

    'use strict';

    var LazyLoad = function (options) {

        var defaults = {
            element: '',
            trigger_partial: true,
            trigger_full: true,
            trigger_load: true,
            callback: null,
        };

        this.options = $.extend(defaults, options);
        this.init();
    };

    LazyLoad.prototype.init = function() {

        var element = $(this.options.element);
        if (element.length === 0) {
            return;
        }

        this.attach_events();
        if (this.options.trigger_load && this.is_element_visible()) {
            this.trigger();
        }
    };

    LazyLoad.prototype.trigger = function() {
        if (typeof this.options.callback === 'function') {
            var element = $(this.options.element);
            this.options.callback.apply(element);
            element.data('loaded', true);
        }
    };

    LazyLoad.prototype.is_element_visible = function() {
        var element = $(this.options.element);
        var position = element[0].getBoundingClientRect();

        // checking whether fully visible
        if(position.top >= 0 && position.bottom <= window.innerHeight && this.options.trigger_load && this.is_element_loaded() === false) {
            return true;
        }
        // checking for partial visibility
        if(position.top < window.innerHeight && position.bottom >= 0 && this.options.trigger_partial && this.is_element_loaded() === false) {
            return true;
        }

        return false;
    };

    LazyLoad.prototype.is_element_loaded = function() {
        var element = $(this.options.element);
        var loaded = element.data('loaded');

        return Boolean(loaded);
    };

    LazyLoad.prototype.attach_events = function() {
        $(window).on('scroll', this.on_scroll.bind(this));
    };

    LazyLoad.prototype.on_scroll = function() {
        var is_visible = this.is_element_visible();
        if (is_visible) {
            this.trigger();
        }
    };

    window.lazyload || (window.lazyload = {});
    window.lazyload.plugins || (window.lazyload.plugins = {});
    window.lazyload.plugins.LazyLoad || (window.lazyload.plugins.LazyLoad = {});
    window.lazyload.plugins.LazyLoad = LazyLoad;

})(jQuery)