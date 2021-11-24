var Destroyer = {};

(function () {

    Destroyer.mark = function (obj) {
        obj.destroy = true;
    };

    Destroyer.unmark = function (obj) {
        obj.destroy = false;
    };

    Destroyer.filter = function (array) {
        return array.filter(function (obj) { if (obj.destroy === true) { return false; } else { return true; }; });
    };

})();