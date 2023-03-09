//mixin
define(['mage/utils/wrapper'], (wrapper)=>{
    return function (originalObject) {
        originalObject.newMethod = function() {
           
            console.log('newMethod')
        }
        return originalObject;
    }
})
