define([
    'jquery',
    'jquery-ui-modules/widget'
], function($) {
    $.widget('vendor.zoomImage', {
        _create: function() {
            const widget = this;
            this.element.on('click', function() {
                let zoomedImg = $('<img />', {
                    'src': widget.element.attr('src')
                }).css({
                    'position': 'absolute',
                    'top': '330px',
                    'left': '25%',
                    'width': '50%',
                    'opacity': 0,
                    'z-index': 1233,
                    'cursor': 'zoom-out',
                }).appendTo('body').animate({
                    'opacity': 1
                }, 300);
                zoomedImg.on('click', function() {
                    zoomedImg.animate({
                        'opacity': 0
                    }, 300, function() {
                        zoomedImg.remove();
                    });
                });
            });
        }
    });
    return $.vendor.zoomImage;
});
