const config = {
    map: {
        "*": {
            customScript1: 'Magento_Theme/js/custom-script1',
            customScript2: 'Magento_Theme/js/custom-script2'
        },
    },
    config: {
        mixins: {
            'Magento_Theme/js/custom-script1':{
                'Magento_Theme/js/mixin/object-mixin': true
            }
        }
    }
}
