define(['jquery', 'uiComponent', 'ko'], function ($, Component, ko) {
    'use strict';
    return Component.extend({
        defaults: {
            template: 'Magento_Theme/view/example_child-js'
        },
        initialize: function () {
            this.customerName = ko.observableArray([]);
            this.customerData = ko.observable('');
            this.methodOops()
            this._super();
        },
        addNewCustomer: function () {
            this.customerName.push({name:this.customerData()});
            this.customerData('');
        },
        methodOops: function() {
            console.log('OOPSS')
        },
    });
});
