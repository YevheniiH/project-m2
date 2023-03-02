const config = {
    map: {
        "*": {
            customScript: 'Magento_Theme/js/custom-script',
            customScript2: 'Magento_Theme/js/custom-script2',

        },
        'Magento_Theme/js/custom-script': {
            dep1: 'Magento_Theme/js/dep1',
            dep2: 'Magento_Theme/js/dep2',
            dep3: 'Magento_Theme/js/dep3'
        }
    },
    paths: {
        swiper: 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min'
    },
    shim: {
      "Magento_Theme/js/custom-script":[],
      customScript: {
          deps:['jquery'],
          export: 'customScriptGlobal'
      }
    },
    deps: ["Magento_Theme/js/custom-script"],
    config: {
        "Magento_Theme/js/custom-script": {
            valueFromRequireJSConfig: false
        },
        mixins: {}
    }
}
