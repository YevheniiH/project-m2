define(['uiComponent', 'ko'], function (Component, ko) {
        'use strict';
        var mixin = {
            initialize: function () {
                this._super();
                this.method1();
            },
            method1: function() {
                console.log('method1')
            },
        };
        return function (target) {
            return target.extend(mixin);
        };

    }
);
