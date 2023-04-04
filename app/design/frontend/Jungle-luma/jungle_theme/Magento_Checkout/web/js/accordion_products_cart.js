define([
     'jquery',
    'collapsible',
     'matchMedia',
     'domReady!',
 ], function ($) {
     'use strict';
     const helpers = {
         domReady: function() {
             const accordionResize = function($accordions ) {
                 $accordions.forEach(function(element, index){
                     const $accordion = $(element);
                     mediaCheck({
                         media: '(min-width: 768px)',
                         entry: function() { // desktop
                             $accordion. collapsible('activate');
                             $accordion.collapsible('option', 'collapsible', false);
                             if ($(window).width() > 768) {
                                 $('.toggle-items-qty').hide();
                             }
                         },
                         exit: function() { // mobile
                             $accordion.collapsible('deactivate');
                             $accordion.collapsible('option', 'collapsible', true);
                             if ($(window).width() <= 768) {
                                 $('.toggle-items-qty').show();
                             }
                             $(document).ready(function() {
                                 const $toggleItems = $('.toggle-items-qty');
                                 const itemCount = $('.item-info').length;
                                 if (itemCount === 0) {
                                     $toggleItems.text('No items in cart');
                                     $('.add-to-cart').hide();
                                     $('.add-to-cart').off('click');
                                 } else if (itemCount === 1) {
                                     $toggleItems.text('1 Item in cart');
                                 } else {
                                     $toggleItems.text(`${itemCount} Items in cart`);
                                 }
                             });
                         }
                     });
                 });
             };
             const $container = $('.accordion'),
                 $accordions = [],
                 accordionOptions = {
                     collapsible: true,
                     header: ' .heading ',
                     trigger: '',
                     content: ' .content ',
                     openState: 'active',
                     animate: false
                 };

             $container.children("div").each(function(index, elem){
                 const $this = $(elem),
                     $accordion = $this.collapsible(accordionOptions);

                 $accordions.push($accordion);
             }) ;

             accordionResize($accordions);
         }
     };
     helpers.domReady();
 });

