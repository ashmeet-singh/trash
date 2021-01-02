var Common = {};

module.exports = Common;

(function () {

    Common.isString = function (X) {
        return (typeof X === 'string');
    };

    Common.isNumber = function (X) {
        return (typeof X === 'number' && isFinite(X));
    };

    Common.isInteger = function (X) {
        return ((typeof X === 'number') && X % 1 === 0);
    };

    Common.isBoolean = function (X) {
        return (typeof X === 'boolean');
    };

    Common.isArray = function (X) {
        return (Object.prototype.toString.call(X) === '[object Array]');
    };

    Common.isNull = function (X) {
        return (X === null);
    };

    Common.isDate = function (X) {
        return (X instanceof Date);
    };

    Common.isUndefined = function (X) {
        return (X === undefined);
    };

    Common.isPlainObject = function testObject(X) {
        return (Object.prototype.toString.call(X) === '[object Object]');
    };

})();