var View = {};

(function () {
    function S(I) { return document.getElementById(I); }
    var MainCanvas = S('MainCanvas');
    var MainRoot = S('MainRoot');

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
        function setElementsProperties() {
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
            MainCanvas.width = IW * 2;
            MainCanvas.height = IH * 2;
        }

        setElementsProperties()
        window.addEventListener('resize', function () { setElementsProperties() });

        MainRoot.style.display = 'block';
    }

    View.switchToFullscreen = function () {
        openFullscreen(MainRoot);
    }
})();