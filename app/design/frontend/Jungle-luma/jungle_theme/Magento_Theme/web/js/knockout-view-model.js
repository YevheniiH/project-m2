define([
    'uiComponent',
    'ko'
], function (Component, ko) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Magento_Theme/knockout-template',
            heading: 'Default Heading Text',
        },

        counter: ko.observable(0),

        initialize: function () {
            this._super();
            this.initCounter();
        },

        initCounter: function () {
            var self = this;
            var num = 0;

            setInterval(function () {
                self.counter(num++);
            }, 1000);
        }
    });
});
