const config = {
    map: {
        "*": {
            customScript1: 'Magento_Theme/js/custom-script1',
            customScript2: 'Magento_Theme/js/custom-script2',
            sendDataFromJs: 'Magento_Theme/js/send-data-fromjs'
        }
    },
    config: {
        mixins: {
            'Magento_Theme/js/knockout-view-model': {
                'Magento_Theme/js/mixin/knockout-view-modeljs-mixin': true
            },
            'Magento_Theme/js/custom-script1':{
                'Magento_Theme/js/mixin/object-mixin': true
            }
        }
    }
}
