const config = {
    map: {
        "*": {
            customScript1: 'Magento_Theme/js/custom-script1',
            customScript2: 'Magento_Theme/js/custom-script2'
        }
    },
    config: {
        mixins: {
            'Magento_Theme/js/knockout-view-model': {
                'Magento_Theme/js/mixin/knockout-view-modeljs-mixin': true
            },
            'Magento_Theme/js/custom-script1':{
                'Magento_Theme/js/mixin/object-mixin': true
            },
            'Magento_Theme/js/zoom-image': {
                'Magento_Theme/js/mixin/zoom-image-widget-mixin': true
            },
        }
    }
}

