var DefaultHelper = require('./default');

module.exports = {

    setData: function(pageObject, data) {
        var formElement = pageObject.getElement();

        return getOptions(pageObject.getElement()).then(function (options) {
            if (options.expanded) {
                if (options.multiple) {
                    return  setDataMultipleExpanded(); // TODO setDataMultipleExpanded();
                } else {
                    return setDataSingleExpanded(); // TODO setDataSingleExpanded();
                }
            } else {
                if (options.multiple) {
                    return setDataMultiple();
                } else {
                    return setDataSingle();
                }
            }
        });

        function setDataSingle() {
            return formElement.element(by.model('vm.data')).element(by.cssContainingText('option', data)).click();
        }

        function setDataSingleExpanded() {
            return formElement.element(by.cssContainingText('label', data)).click()
        }

        function setDataMultiple() {
            var promises = [], i;

            for (i in data) {
                if (data.hasOwnProperty(i)) {
                    promises.push(
                        formElement.element(by.model('vm.data')).element(by.cssContainingText('option', data[i])).click()
                    );
                }
            }

            return protractor.promise.all(promises);
        }

        function setDataMultipleExpanded() {
            var promises = [], i;

            for (i in data) {
                if (data.hasOwnProperty(i)) {
                    promises.push(
                        formElement.element(by.cssContainingText('label', data[i])).click()
                    );
                }
            }

            return protractor.promise.all(promises);
        }
    },

    getData: function(pageObject) {
        var formElement = pageObject.getElement();

        return getOptions(formElement).then(function (options) {
            if (options.expanded) {
                if (options.multiple) {
                    return getDataMultipleExpanded(); // TODO getDataMultipleExpanded()
                } else {
                    return getDataSingleExpanded(); // TODO getDataSingleExpanded()
                }
            } else {
                if (options.multiple) {
                    return getDataMultiple();
                } else {
                    return getDataSingle();
                }
            }
        });

        function getDataSingle() {
            return formElement.element(by.model('vm.data')).element(by.css('option:checked')).getText();
        }

        function getDataSingleExpanded() {
            return formElement.element(by.css('label[ng-repeat] input:checked')).element(by.xpath('ancestor::label')).getText()
        }

        function getDataMultiple() {
            var d = protractor.promise.defer(),
                data = [],
                options = formElement.element(by.model('vm.data')).all(by.css('option:checked'));

            options.count().then(function (total) {
                options.each(function (option, index) {
                    option.getText().then(function (text) {
                        data.push(text);

                        // Last Option
                        if (index === total - 1) {
                            d.fulfill(data);
                        }
                    });
                });
            });

            return d.promise;
        }

        function getDataMultipleExpanded() {
            var d = protractor.promise.defer(),
                data = [],
                options = formElement.all(by.css('input:checked'));

            options.count().then(function (total) {
                options.each(function (option, index) {
                    option.getAttribute('value').then(function (value) {
                        data.push(value);

                        // Last Option
                        if (index === total - 1) {
                            d.fulfill(data);
                        }
                    });
                });
            });

            return d.promise;
        }
    },

    // TODO Implement.
    clearData: function() {
        return protractor.promise.when(true);
    },
    getErrors: DefaultHelper.getErrors
};

function getOptions(formElement) {
    var deferred = protractor.promise.defer(),
        selectElements = formElement.all(by.css('select')),
        inputElements = formElement.all(by.css('input'));

    selectElements.count().then(function (selectCount) {
        if (selectCount === 1) {
            selectElements.get(0).getAttribute('multiple').then(function (multiple) {
                deferred.fulfill({
                    multiple: null !== multiple,
                    expanded: false
                });
            });
        } else {
            inputElements.get(0).getAttribute('type').then(function (type) {
                deferred.fulfill({
                    multiple: 'radio' !== type.toLowerCase(),
                    expanded: true
                });
            });
        }
    });

    return deferred.promise;
}