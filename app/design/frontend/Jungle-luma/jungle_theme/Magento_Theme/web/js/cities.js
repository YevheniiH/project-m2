define(['jquery',
    'uiComponent',
    'ko',
    'Magento_Theme/js/data-storage',
    'pagination'], function ($, Component, ko, dataStorage, pagination) {
    'use strict';

    return Component.extend({
        initialize: function () {
            this._super();
            // console.log(dataStorage.shops);
            // console.log(dataStorage.city);

            this.selectedShops = [];
            // отримання id при виборі міста
            this.selectedCity.subscribe(function (selectedCityId) {
               // console.log(selectedCityId);
                this.renderShopsFilters(selectedCityId);
                this.cityName(this.findCityNameById(selectedCityId));

            }, this);

            this.checkedFilters.subscribe(function (newFilters) {
                this.renderShopsFilters(this.selectedCity());
                this.refreshPagination();
            }, this);
        },

        refreshPagination: function(){
            const paginationContainer = $('#pagination-container');
            paginationContainer.pagination('destroy');
            this.initPagination();
        },


        initPagination: function (){
            const self = this;
            const paginationContainer = $('#pagination-container');

            paginationContainer.pagination({
                dataSource: self.renderShopsForCity(),
                pageSize: 6,
                showSizeChanger: true,
                callback: function(data, pagination) {
                    self.paginationStores(data);

                }
            });
        },

        renderShopsFilters: function (selectedCityId){

            if(selectedCityId){
                let shopsForCity = dataStorage.shops[selectedCityId];
                // console.log(shopsForCity);

                let uniqueShops = {}; // об. для того щоб фільтрувати назву магазинів.
                let uniqueShopsArray = []; //маси для того щоб зберігати різні назви магаз.

                shopsForCity.forEach(function (shop){
                    // console.log(shop);
                    if(!uniqueShops[shop.name]){   //роблю перевірку що якщо назва магазину ще не збереженна то додати її в массив
                        uniqueShops[shop.name]= true;
                        uniqueShopsArray.push(shop);
                    }
                });

                let renderedUniqueShops = [];
                let selectedShopNames = this.checkedFilters();

                if(selectedShopNames.length){
                    for(let i = 0; i < selectedShopNames.length; i++){
                        let selectedShopName = selectedShopNames[i];
                        for(let j = 0; j < shopsForCity.length; j++) {
                            if(shopsForCity[j].name === selectedShopName) {
                                renderedUniqueShops.push(shopsForCity[j]);
                            }
                        }
                    }
                    shopsForCity = renderedUniqueShops;
                }
                this.renderShopsForCity(shopsForCity);

                // викликаю для відображення функію і передаю їй параметр масив з збережиними назвами для відображення
                this.availableShops(uniqueShopsArray);
            }
        },
        // renderShopsForCity

        findCityNameById:function (cityId){
            for(let i = 0; i < dataStorage.city.length; i++){
                if(dataStorage.city[i].id === cityId) {
                    return dataStorage.city[i].label;
                }
            }
        },

        checkedFilters:ko.observableArray([]),//
        paginationStores:ko.observableArray([]),
        renderShopsForCity: ko.observableArray([]),
        cityName: ko.observable(''),
        availableShops: ko.observableArray([]),
        selectedCity : ko.observable(''),
        cities: ko.observableArray(dataStorage.city),
        shops: ko.observable(dataStorage.shops),
    });
});

