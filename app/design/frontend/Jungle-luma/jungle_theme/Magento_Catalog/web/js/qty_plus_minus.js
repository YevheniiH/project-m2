define(['jquery'], function ($) {
    'use strict';
    return function () {
        const $qtyInput = $('input.qty');
        const $qtyMinus = $('.qty-decrement');
        const $qtyPlus = $('.qty-increment');


        $qtyMinus.on('click', function () {
            let qty = parseInt($qtyInput.val());
            if (qty > 1) {
                $qtyInput.val(qty - 1);
            }

        });

        $qtyPlus.on('click', function () {
            let qty = parseInt($qtyInput.val());
            $qtyInput.val(qty + 1);

        });

    }
});
