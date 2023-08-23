define(['jquery', 'uiComponent', 'ko', 'Magento_Ui/js/modal/modal'], function ($, Component, ko, modal) {
    'use strict';

    return Component.extend({
        initialize: function () {
            this._super();

            this.showForm = ko.observable(false);
            this.categories = ko.observableArray([
                { category: 'House', items: ko.observableArray([]) },
                { category: 'Work', items: ko.observableArray([]) },
                { category: 'Rest', items: ko.observableArray([]) },
                { category: 'Homework', items: ko.observableArray([]) }
            ]);
            this.selectedCategory = ko.observable('');
            this.newCategoryName = ko.observable('');
            this.newItem = ko.observable('');
            this.selectedCategoryItems = ko.observableArray([]);
            this.editingItem = ko.observable(null);
            this.isEditSave = ko.observable(false); //видимість кнопки "save Edit" кнопки

        },



        ////////// started function edit and save  ////////
        editItem: function (category, item) {
            this.openPopup();
            // обєкт який редагую
            this.editingItem({
                category: category,
                item: item,
            });
            //відображення категорії редагування
            this.selectedCategory(category.category);
            //задача елемента для редагування
            this.newItem(item.value);
            this.isEditSave(true); //встановлюю флажок що кнопка видима
        },

        saveItem: function () {
            // Отримую елемент для редагування
            const editingItem = this.editingItem();
            // тут отримую назву нової категорії
            const newCategory = this.newCategoryName();
            // Перевіряю чи потрібно створити нову категорію і задачу
            if (newCategory && !this.categoryExists(newCategory) && this.newItem().trim() !== '') {
                const newId = Date.now();
                // Додаю нову категорію і задачу до списку
                this.categories.push({
                    category: newCategory,
                    items: ko.observableArray([{ id: newId, value: this.newItem() }])
                });
                // Встановлюю обрану категорію на нову категорію
                this.selectedCategory(newCategory);
                //очищаю назву нової категорії та задачі
                this.newCategoryName('');
                this.newItem('');
            }
            // роблю перевірку для того чи потрібно зберегти редагований елемент
            if (editingItem) {
                // Перевіряю, чи відбулися зміни у задачі або категорії
                if (editingItem.item.value !== this.newItem() || editingItem.category.category !== this.selectedCategory()) {
                    // Видаляю задачу  із попередньої категорії
                    editingItem.category.items.remove(editingItem.item);
                    // Знаходжу або створюю категорію, в яку буде перенесений редагований елемент
                    let targetCategory = null;
                    for (const cat of this.categories()) {
                        if (cat.category === this.selectedCategory()) {
                            targetCategory = cat; // Зберігаю знайдену категорію
                            break;
                        }
                    }
                    // Додаю редагований елемент до вибраної чи нової категорії
                    if (targetCategory) {
                        if (this.newItem().trim() !== '') { // Перевірка на пусту задачу
                            targetCategory.items.push({
                                id: editingItem.item.id,
                                value: this.newItem(),
                            });
                        }
                        // Якщо оригінальна категорія порожня, видаляю її
                        if (editingItem.category.items().length === 0) {
                            this.categories.remove(editingItem.category);
                        }
                    }
                }
            }
            // Завершую редагування, очищаю дані
            this.editingItem(null);
            this.newItem('');
            this.closePopup();
        },
        ////////// end function edit and save //////////

        toggleFormAndPopupVisibility: function () {
            this.toggleFormVisibility();
            this.openPopup();
        },

        toggleFormVisibility: function () {
            this.showForm(!this.showForm());
            this.selectedCategory('');
            this.isEditSave(false);
        },

        addCategory: function () {
            const self = this;
            const newCategory = this.newCategoryName();
            if (newCategory && !this.categoryExists(newCategory) && self.newItem()) {
                const newId = Date.now();
                this.categories.push({
                    category: newCategory,
                    items: ko.observableArray([{id: newId, value: self.newItem()}])
                });

                this.selectedCategory(newCategory);
                this.newCategoryName('');
                self.newItem('');
                this.closePopup();
            } else {
                const targetCategory = this.categories().map(function (cat) {
                    const categoryToChange =  self.newCategoryName() || self.selectedCategory();

                    if (categoryToChange.toLowerCase() === cat['category'].toLowerCase() && self.newItem()) {
                        cat.items.push({ id: Date.now(), value: self.newItem() });
                        self.newItem('');
                        self.closePopup();
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
