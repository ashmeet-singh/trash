var Arena = {};

module.exports = Arena;

var Vector = require('./Vector.js');

(function () {

    Arena.create = function () {
        var arena = {
            time: undefined,
            timeoutId: undefined,
            settings: {
                arrow: {
                    speed: 4,
                    angularVelocity: 0.02,
                    speed1: 0.2,
                    angularVelocity1: 0.1
                }
            },
            arrows: []
        };
        return arena;
    };

    function getRndNum(min, max, scale) {
        if (scale === undefined) { scale = 0; }
        scale = Math.pow(10, scale);
        min *= scale;
        max *= scale;
        return (Math.floor(Math.random() * (max - min + 1)) + min) / scale;
    }

    function getRndAngle() {
        return Math.random() * Math.PI * 2;
    }

    function getRndId() {
        return (Math.floor(Math.random() * 10000000000) + '_' + Math.floor(Math.random() * 10000000000));
    }

    Arena.update = function (arena, MS_PER_UPDATE) {
        var i;
        var settings = arena.settings;
        var arrows = arena.arrows;
        var arrow;
        for (i = 0; i < arrows.length; i++) {
            arrow = arrows[i];
            arrow.angularVelocity = settings.arrow.angularVelocity * arrow.controls.L;
            Vector.rotate(arrow.direction, arrow.angularVelocity, arrow.direction);
            Vector.add(arrow.position, Vector.mult(arrow.direction, arrow.speed), arrow.position);
        }
    };

    function createArrow(arena) {
        var newArrow = {
            position: Vector.create(0, 0),
            direction: Vector.rotate(Vector.create(0, 1), getRndAngle()),
            speed: arena.settings.arrow.speed,
            angularVelocity: 0,
            controls: { L: 0, R: 0 },
            connectionTimestamp: Date.now(),
            privateId: getRndId(),
            publicId: getRndId()
        };
        return newArrow;
    }

    Arena.addArrow = function (arena) {
        var newArrow = createArrow(arena);
        arena.arrows.push(newArrow);
        return newArrow;
    };

    Arena.setArrowControls = function (arena, privateId, controls) {
        var i;
        var arrows = arena.arrows;
        var arrow;
        for (i = 0; i < arrows.length; i++) {
            if (arrows[i].privateId === privateId) {
                arrow = arrows[i];
                break;
            }
        }
        var L = controls.L;
        var R = controls.R;
        if (arrow !== undefined && (L === -1 || L === 0 || L === 1) && (R === 0 || R === 1)) {
            arrow.controls = controls;
            arrow.connectionTimestamp = arena.time;
            return true;
        } else {
            return false;
        }
    }

    Arena.start = function (arena, MS_PER_UPDATE) {
        arena.time = Date.now();

        (function loop() {
            while (Date.now() > arena.time) {
                Arena.update(arena, MS_PER_UPDATE);
                arena.time += MS_PER_UPDATE;
            }

            arena.timeoutId = setTimeout(function () { loop(); }, MS_PER_UPDATE);
        })();
    };

    Arena.stop = function (arena) {
        clearTimeout(arena.timeoutId);
        arena.timeoutId = undefined;
        arena.time = undefined;
    };

})();