var ServerFunctions = {};

module.exports = ServerFunctions;

var Arena = require('./Arena.js');
var Common = require('./Common.js');

(function () {

    ServerFunctions.addArrow = function (store) {
        return {
            arrow: Arena.addArrow(store.arena)
        };
    }

    function copyArrowForClient(arrow) {
        return {
            position: arrow.position,
            direction: arrow.direction,
            speed: arrow.speed,
            angularVelocity: arrow.angularVelocity,
            controls: arrow.controls,
            publicId: arrow.publicId
        };
    }

    function copyArenaForClient(arena, privateId) {
        var newArrows = [];
        var arrows = arena.arrows;
        var i;
        for (i = 0; i < arrows.length; i++) {
            if (arrows[i].privateId === privateId) { newArrows.push(arrows[i]); }
            else { newArrows.push(copyArrowForClient(arrows[i])); }
        }
        return { time: arena.time, arrows: newArrows };
    }

    ServerFunctions.setControlsAndGetArena = function (store, X) {
        if (Common.isString(X.privateId) && Common.isPlainObject(X.controls) && Common.isNumber(X.controls.L) && Common.isNumber(X.controls.R)) {
            var success = Arena.setArrowControls(store.arena, X.privateId, { L: X.controls.L, R: X.controls.R });
            if (success === true) {
                return {
                    success: success,
                    arena: copyArenaForClient(store.arena, X.privateId)
                };
            } else if (success === false) {
                return {
                    success: success
                };
            }
        }
    }


})();