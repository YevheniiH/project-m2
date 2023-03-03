define(['module'], (module)=> {
   return function (config, element) {
        module.config && console.table(module.config())
       console.table(config)
   }
});
