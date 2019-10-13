 (function (modules) { // webpackBootstrap
   // The module cache
   var installedModules = {};

   // The require function
   function __webpack_require__(moduleId) {

     // Check if module is in cache
     if (installedModules[moduleId]) {
       return installedModules[moduleId].exports;
     }
     // Create a new module (and put it into the cache)
     var module = installedModules[moduleId] = {
       i: moduleId,
       l: false,
       exports: {}
     };

     // Execute the module function
     modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

     // Flag the module as loaded
     module.l = true;
     console.log(installedModules)
     // Return the exports of the module
     return module.exports;

   }

   // Load entry module and return exports
   return __webpack_require__(__webpack_require__.s = "./src/index.js");
 })

 ({

   "./src/dependence-a.js": (function (module, exports, __webpack_require__) {

     eval("const {b} = __webpack_require__(/*! ./dependence-b */ \"./src/dependence-b.js\")\r\nmodule.exports = `10 ` + b;\r\n\r\n\n\n//# sourceURL=webpack:///./src/dependence-a.js?");

   }),

   "./src/dependence-b.js": (function (module, exports) {

     eval("exports.b = 'bigham';\n\n//# sourceURL=webpack:///./src/dependence-b.js?");

   }),

   "./src/index.js":

     (function (module, exports, __webpack_require__) {
       eval("const a = __webpack_require__(/*! ./dependence-a */ \"./src/dependence-a.js\");\r\nconsole.log(a);\n\n//# sourceURL=webpack:///./src/index.js?");
     })

 });