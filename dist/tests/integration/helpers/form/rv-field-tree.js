var DefaultHelper=require("./default");module.exports={setData:function(a,b){return protractor.promise.when(!0)},getData:function(a){var b=a.getElement();return b.getAttribute("multiple").then(function(a){return null===a?"":[]})},getErrors:DefaultHelper.getErrors};
//# sourceMappingURL=rv-field-tree.js.map