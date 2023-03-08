define(['customScript1'], function (customScript1){
    "use strict";
    return function(){
        console.log(customScript1.sum());
        customScript1.newMethod();
        console.log(customScript1)

    }
})

