var Controller = {};

(function () {
    function S(I) { return document.getElementById(I); }

    var MainCanvas = S('MainCanvas');

    Controller.initialize = function () {
        var newControls = { L: 0, R: 0 };

        function addTouchEventListeners(elem, process_touchstart, process_touchmove, process_touchcancel, process_touchend) {
            elem.addEventListener('touchstart', process_touchstart, false);
            elem.addEventListener('touchmove', process_touchmove, false);
            elem.addEventListener('touchcancel', process_touchcancel, false);
            elem.addEventListener('touchend', process_touchend, false);
        }

        function set(x) {
            var IW = window.innerWidth;
            var P = IW / 5;
            if (x < P) {
                newControls.L = -1;
            } else if (x < P * 2) {
                newControls.L = 1;
            } else if (x < P * 3) {
                newControls.L = 0;
                newControls.R = 0;
            } else if (x < P * 5) {
                newControls.R = 1;
            }
        }
        function reset(x) {
            var IW = window.innerWidth;
            var P = IW / 5;
            if (x < P * 2) {
                newControls.L = 0;
            } else if (x < P * 3) {
                newControls.L = 0;
                newControls.R = 0;
            } else if (x < P * 5) {
                newControls.R = 0;
            }
        }
        addTouchEventListeners(MainCanvas,
            function (E) {
                var T = E.changedTouches;
                if (T[0] !== undefined) { set(T[0].clientX); };
                if (T[1] !== undefined) { set(T[1].clientX); };
            },
            function (E) {
                var T = E.changedTouches;
                if (T[0] !== undefined) { set(T[0].clientX); };
                if (T[1] !== undefined) { set(T[1].clientX); };
            },
            function () { },
            function (E) {
                var T = E.changedTouches;
                if (T[0] !== undefined) { reset(T[0].clientX); };
                if (T[1] !== undefined) { reset(T[1].clientX); };
            }
        );
        return newControls;
    }
})();