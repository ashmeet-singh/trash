var View = {};

function QS(selectors, baseElement) {
    if (baseElement === undefined) { baseElement = document.body; }
    element = baseElement.querySelector(selectors);
    return element;
}

function QSA(selectors, parentNode) {
    if (parentNode === undefined) { parentNode = document.body; }
    elementList = parentNode.querySelectorAll(selectors);
    return elementList;
}

(function () {
    var MainCanvas = QS('#MainCanvas');
    var MainRoot = QS('#MainRoot');
    var LeftJoystick = QS('#LeftJoystick');
    var RightJoystick = QS('#RightJoystick');
    var MainMenu = QS('#MainMenu');
    var PauseMenu = QS('#PauseMenu');

    function openFullscreen(elem) {
        var options = { navigationUI: 'hide' };
        if (elem.requestFullscreen) {
            elem.requestFullscreen(options);
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen(options);
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen(options);
        }
    }

    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }

    View.initializeElements = function () {
        function setElementsPropertiesOnResize() {
            var IW = window.innerWidth;
            var IH = window.innerHeight;

            function fixElement(elem, L, T, W, H) {
                elem.style.position = 'fixed';
                elem.style.top = T + 'px';
                elem.style.left = L + 'px';
                elem.style.width = W + 'px';
                elem.style.height = H + 'px';
            }

            fixElement(MainRoot, 0, 0, IW, IH);
            fixElement(MainCanvas, 0, 0, IW, IH);
            fixElement(MainMenu, 0, 0, IW, IH);
            fixElement(PauseMenu, 0, 0, IW, IH);
            MainCanvas.width = IW * 2;
            MainCanvas.height = IH * 2;

            var diameter = Math.floor(Math.sqrt(IW * IH) * 0.23);
            var radius = diameter / 2;
            var top = IH * 0.6;
            var left = (IW * 0.2) - radius;
            fixElement(LeftJoystick, left, top, diameter, diameter);
            fixElement(RightJoystick, IW - left - diameter, top, diameter, diameter);
        }

        setElementsPropertiesOnResize();
        window.addEventListener('resize', function () { setElementsPropertiesOnResize(); });

        MainRoot.style.display = 'block';
    };

    View.switchToFullscreen = function () {
        openFullscreen(MainRoot);
    };

    View.clearMainCanvas = function () {
        var ctx = MainCanvas.getContext('2d', { alpha: false });
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, MainCanvas.width, MainCanvas.height);
    };

    View.show = function (elements, value) {
        var i;
        for (i = 0; i < elements.length; i++) {
            if (value === undefined) { QS(elements[i]).style.display = 'block'; }
            else { QS(elements[i]).style.display = value; }
        }
    };

    View.hide = function (elements) {
        var i;
        for (i = 0; i < elements.length; i++) {
            QS(elements[i]).style.display = 'none';
        }
    };

})();