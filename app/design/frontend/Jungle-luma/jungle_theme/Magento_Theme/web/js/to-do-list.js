define(['jquery', 'uiComponent', 'ko', 'Magento_Ui/js/modal/modal', 'slick'], function ($, Component, ko, modal) {
    'use strict';

    return Component.extend({

        initialize: function () {
            this._super();
            this.showForm = ko.observable(false);
            this.categories = ko.observableArray([
                {
                    category: 'House',
                    items: ko.observableArray([
                        {
                        id: 1,
                        value: 'OOO',
                        backgroundColor: 'white',
                        iconColor: 'gold',
                        },
                        {
                            id: 2,
                            value: 'AAAAA',
                            backgroundColor: 'gold',
                            iconColor: 'blue',
                        },
                    ]),
                },
                {
                    category: 'Work',
                    items: ko.observableArray([]),
                },
                {
                    category: 'Rest',
                    items: ko.observableArray([
                        {
                            id: 2.2,
                            value: '2.2',
                            backgroundColor: 'red',
                            iconColor: 'black',
                        },
                        {
                            id: 2.3,
                            value: '2.3',
                            backgroundColor: 'black',
                            iconColor: 'pink',
                        },
                        {
                            id: 2.4,
                            value: '2.5',
                            backgroundColor: 'green',
                            iconColor: 'red',
                        },
                        {
                            id: 2.5,
                            value: '2.6',
                            backgroundColor: 'yellow',
                            iconColor: 'blue',
                        },
                    ]),
                },
            ]);
            this.selectedCategory = ko.observable('');
            this.newCategoryName = ko.observable('');
            this.newItem = ko.observable('');
            this.selectedCategoryItems = ko.observableArray([]);
            this.isEditSave = ko.observable(false); //видимість кнопки "save Edit" кнопки
            this.archive  = ko.observableArray([]);
            this.toggleArchiveSwitch = ko.observable(false);
            this.newBackgroundColor = ko.observable('')
            this.newIconColor = ko.observable('');
            this.editingItem = ko.observable(null);
            this.initSlider();
            $(document).on('click', '.edit', this.editItem.bind(this));
            $(document).on('click', '.delete', this.archiveCategory.bind(this));
        },

        archiveCategory: function (event) {
            const newId = Date.now();
            const editButton = $(event.currentTarget);
            const categoryIndex = editButton.parents('.block-list').data('category-index');
            const itemIndex = editButton.data('item-index');
            const category = this.categories()[categoryIndex];
            const item = category.items()[itemIndex];
            const categoryName = category.category;
            const itemName = item.value;

            let existingCategory = null;
            for(let i = 0; i < this.archive().length; i++ ) {
                if(this.archive()[i].category === categoryName){ // цикл для перевірки чи є така категорія в масиві архів
                    existingCategory = this.archive()[i]; // якщо знайденна присвоюю значення змінній щоб в подальшому додати задачу
                    break;
                }
            }

            if(existingCategory){ // якщо категорія існує
                existingCategory.items.push({
                    id: newId,
                    value: itemName,
                    backgroundColor: item.backgroundColor,
                    iconColor: item.iconColor,
                    originalCategory: categoryName,
                }) // додаю в масив з категорією задачу
            } else {// якщож категорія не існує
                this.archive.push({//то додаю до масиву як категорію так і задачу
                    category: categoryName,
                    items: ko.observableArray([{
                        id: newId,
                        value: itemName,
                        backgroundColor: item.backgroundColor,
                        iconColor: item.iconColor,
                        originalCategory: categoryName,
                    }])
                });
            }

            this.sortArchive();//викликаю функцію сортування

            category.items.remove(item); // видаляю задачу
            if (category.items().length === 0) { // якщо в категорії відсутні задачі (пуста) видалити категорію
                this.categories.remove(category);
            }
        },

        sortArchive: function (){
            this.archive.sort((a, b) => a.category.localeCompare(b.category));//порівнюю два елементи localeCompare визначає я категорія слідує за алфавітом
        },
        ////////// end function edit and save  ////////

        // function restore
        restoreItemArchive: function (category, item) {
            const newId = Date.now();
            const categoryName = item.originalCategory;
            const itemValue =  item.value;
            const itemBackgroundColor = item.backgroundColor;
            const itemIconColor =  item.iconColor;

            let existingCategory = null;
            for (let i = 0; i < this.categories().length; i++) {
                if (this.categories()[i].category === categoryName) {
                    existingCategory = this.categories()[i];
                    break;
                }
            }

            if (existingCategory) {
                existingCategory.items.push({
                    id: newId,
                    value: itemValue,
                    backgroundColor: itemBackgroundColor,
                    iconColor: itemIconColor,

                });
            } else {
                this.categories.push({
                    category: categoryName,
                    items: ko.observableArray([{
                        id: newId,
                        value: itemValue,
                        backgroundColor: itemBackgroundColor,
                        iconColor: itemIconColor,
                    }])
                });
            }
            this.removeItemArchive(category, item);
            this.closePopup('#archive-popup');
        },
        //
        editItem: function (event) {
            const editButton = $(event.currentTarget);
            const categoryIndex = editButton.parents('.block-list').data('category-index');
            const itemIndex = editButton.data('item-index');
            const category = this.categories()[categoryIndex];
            const item = category.items()[itemIndex];

            this.openPopup();
            // обєкт який редагую
            this.editingItem({
                category: category,
                item: item,

            });
            this.newBackgroundColor(item.backgroundColor);
            this.newIconColor(item.iconColor);
            //відображення категорії редагування
            this.selectedCategory(category.category);
            //задача елемента для редагування
            this.newItem(item.value);
            this.isEditSave(true); //встановлюю флажок що кнопка видима
        },

        generateNewColorBg: function (){
            this.newBackgroundColor(this.getRandomColor());
        },
        generateNewColorIcon: function (){
            this.newIconColor(this.getRandomColor());
        },

        getRandomColor: function () {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },

        ////////// end function getRandom  ///////////
        initSlider: function (){
            const self = this;
            $('.slider-default').slick({
                dots: true,
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 3,
                autoplay: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 3,
                            dots: true,
                            infinite: true,
                        }
                    },
                ]
            })

        },

        ////////// started function edit and save  ////////
        toggleArchive: function (){
            this.toggleArchiveSwitch(!this.toggleArchiveSwitch());
            this.archivePopup('');
        },

        removeItemArchive: function (category, item){
            category.items.remove(item);
            if(category.items().length === 0){
                this.archive.remove(category);
            }
        },

        ////////// started function edit and save  ////////

        saveItem: function () {
            const self = this;
            // Отримую елемент для редагування
            const editingItem = this.editingItem();
            // тут отримую назву нової категорії
            const newCategory = this.newCategoryName();
            let originalBackgroundColor = null;
            if($('.slider-default').hasClass('slick-initialized')) {
                $('.slider-default').slick('unslick');
            }
            // Перевіряю чи потрібно створити нову категорію і задачу
            if (newCategory && !this.categoryExists(newCategory) && this.newItem().trim() !== '') {
                const newId = Date.now();
                // Додаю нову категорію і задачу до списку
                this.categories.push({
                    category: newCategory,
                    items: ko.observableArray([{
                        id: newId,
                        value: this.newItem(),
                        backgroundColor: self.newBackgroundColor(),
                        iconColor: self.newIconColor(),
                    }])
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
                if (editingItem.item.value !== this.newItem() || editingItem.category.category !== this.selectedCategory() || originalBackgroundColor !== self.newBackgroundColor) {
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
                                backgroundColor: self.newBackgroundColor(),
                                iconColor: self.newIconColor(),
                            });
                        }
                        // Якщо оригінальна категорія порожня, видаляю її
                        if (editingItem.category.items().length === 0) {
                            this.categories.remove(editingItem.category);
                        }
                    }
                }
            }

            this.editingItem(null);
            this.newItem('');
            self.initSlider();
            this.closePopup('#modal-content');
            self.initSlider();
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

            if($('.slider-default').hasClass('slick-initialized')) {
                $('.slider-default').slick('unslick');
            }

            if (newCategory && !this.categoryExists(newCategory) && self.newItem()) {
                const newId = Date.now();

                this.categories.push({
                    category: newCategory,
                    items: ko.observableArray([{
                        id: newId,
                        value: self.newItem(),
                        backgroundColor: self.newBackgroundColor(),
                        iconColor: self.newIconColor(),
                    }]),
                });

                this.selectedCategory(newCategory);
                this.newCategoryName('');
                self.newItem('');
                this.closePopup('#modal-content');
            } else {

                const targetCategory = this.categories().map(function (cat) {
                    const categoryToChange = self.newCategoryName() || self.selectedCategory();

                    if (categoryToChange.toLowerCase() === cat['category'].toLowerCase() && self.newItem()) {
                        cat.items.push({
                            id: Date.now(),
                            value: self.newItem(),
                            backgroundColor: self.newBackgroundColor(),
                            iconColor: self.newIconColor(),
                        });
                        self.newItem('');
                        self.closePopup('#modal-content');
                    }
                    return cat
                });

                this.categories(targetCategory);
            }
            self.initSlider();
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
            this.newBackgroundColor(this.getRandomColor());
            this.newIconColor(this.getRandomColor());
            this.generateNewColorBg(this.getRandomColor());
            this.generateNewColorIcon(this.getRandomColor());
            const popup = modal(options, $('#modal-content'));
            $('#modal-content').modal('openModal');
        },

        archivePopup: function () {
            const options = {
                type: 'popup',
                responsive: true,
                innerScroll: true,
                title: 'archive-popup',
                buttons: []
            };

            const popup = modal(options, $('#archive-popup'));
            $('#archive-popup').modal('openModal');
        },

        closePopup: function (id) {
            $(id).modal('closeModal');
        },

    });
});
