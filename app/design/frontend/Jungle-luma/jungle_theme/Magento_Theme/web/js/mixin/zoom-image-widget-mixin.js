define(['jquery'], ($) =>{
    const mixin ={
        _create: function() {
            const widget = this;
            this.element.on('click', function() {
                let zoomedImg = $('<img />', {
                    'src': widget.element.attr('src')
                }).css({
                    'position': 'absolute',
                    'top': '620px',
                    'left': '40%',
                    'width': '20%',
                    'opacity': 0,
                    'z-index': 1233,
                    'cursor': 'zoom-out',
                    'border': '4px solid red',
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
    }
    return function(originalWidget){
        $.widget(
            'vendor.zoomImageRed',
            originalWidget,
            mixin,
        {}
        );
        return $.vendor.zoomImageRed;
    }
});

