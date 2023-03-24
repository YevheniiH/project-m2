define(['uiComponent', 'ko'], (uiComponent, ko)=>{
    'use strict';
    var mixin = {
        defaults: {
            template: 'Magento_Checkout/minicart-mixin-template'
        },
        initialize: function () {
            this._super();
            console.log('mixin template replace minicart')
        },
    };
    return function (target) {
        return target.extend(mixin);
    };
})
