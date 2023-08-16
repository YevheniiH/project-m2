define(['jquery', 'uiComponent', 'ko', 'Magento_Ui/js/modal/modal'], function ($, Component, ko, modal) {
    'use strict';

    return Component.extend({
        initialize: function () {
            this._super();

            this.showForm = ko.observable(false);
            this.categories = ko.observableArray([
                { category: 'House', items: ko.observableArray([]) },
                { category: 'Work', items: ko.observableArray([]) },
                { category: 'Rest', items: ko.observableArray([]) }
            ]);
            this.selectedCategory = ko.observable('');
            this.newCategoryName = ko.observable('');
            this.newItem = ko.observable('');
            this.selectedCategoryItems = ko.observableArray([]);
        },

        toggleFormVisibility: function () {
            this.showForm(!this.showForm());
            this.selectedCategory('');
        },

        addCategory: function () {
            const self = this;
            const newCategory = this.newCategoryName();


            if (newCategory && !this.categoryExists(newCategory) && self.newItem()) {
                this.categories.push({category: newCategory, items: ko.observableArray([this.newItem()])});
                this.selectedCategory(newCategory);
                this.newCategoryName('');
                this.closePopup();
            } else {
                const targetCategory = this.categories().map(function (cat) {

                    const categoryToChange =  self.newCategoryName() || self.selectedCategory();

                    if (categoryToChange.toLowerCase() === cat['category'].toLowerCase() && self.newItem()) {
                        cat.items.push(self.newItem());
                    }

                    return cat
                });
                this.categories(targetCategory);
            }
            return false;
        },

        addItem: function () {
            if (this.newItem() && this.selectedCategory()) {
                const category = ko.utils.arrayFirst(this.categories(), function (cat) {
                    return cat.category === this.selectedCategory();
                }, this);

                if (category) {
                    category.items.push(this.newItem());
                    this.newItem('');
                }
            }
        },

        categoryExists: function (categoryName) {
            const existingCategory = this.categories().find(cat => categoryName.toLowerCase() === cat.category.toLowerCase());
            return !!existingCategory;

        },

        openPopup: function () {
            const options = {
                type: 'popup',
                responsive: true,
                innerScroll: true,
                title: 'Add Category',
                buttons: []
            };
            const popup = modal(options, $('#modal-content'));
            $('#modal-content').modal('openModal');
        },

        closePopup: function () {
            $('#modal-content').modal('closeModal');
        }
    });
});
