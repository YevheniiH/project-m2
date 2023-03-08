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
                'Magento_Theme/js/knockout-view-modeljs-mixin': true
            }
        }
    }
}
