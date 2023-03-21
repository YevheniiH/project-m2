define(['jquery', 'Magento_Theme/js/zoom-image'], function($, zoomImage) {
    $.widget('vendor.extendWidgetZoom', $.vendor.zoomImage, {
        _create: function() {

            this._super();

            const widget = this;
            this.element.on('click', function() {
                widget.element.css({
                    'width': widget.element.width() / 2,
                    'height': widget.element.height() / 2
                });
            });
        }
    });

    return $.vendor.extendWidgetZoom;
});
