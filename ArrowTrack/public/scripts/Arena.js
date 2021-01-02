var Arena = {};

(function () {

    var cvs = document.getElementById('MainCanvas');
    var ctx = cvs.getContext('2d', { alpha: false });;

    Arena.create = function () {
        var arena = {
            arrowPublicId: undefined,
            arrowPrivateId: undefined,
            server: undefined,
            local: {
                time: undefined,
                frameRequestId: undefined
            }
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
    Arena.update = function (arena, MS_PER_UPDATE) {

    };

    Arena.render = function (arena, MS_PER_UPDATE) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        var x = 100, y = 100;
        var grd = ctx.createRadialGradient(cvs.width / 2, cvs.height / 2, 1, cvs.width / 2, cvs.height / 2, cvs.width);
        grd.addColorStop(0, "#243b55");
        grd.addColorStop(1, "#141e30");

        // Fill with gradient
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        ctx.translate(cvs.width / 2, cvs.height / 2);
        ctx.scale(0.3, 0.3);

        function renderArrow(arrow) {
            var s = '#000000';
            if (arrow.privateId === arena.arrowPrivateId) { s = '#ff0000' }
            CGR(ctx, [
                {
                    type: 'polygon',
                    fill: true,
                    fillStyle: s,
                    points: [0, -1, -0.7, 1, 0, 0.8, 0.7, 1]
                }
            ], arrow.position, Vector.angle(arrow.direction, Vector.create(0, 0)) - 1.571, Vector.mult(Vector.create(1, 1), 50));
        }
        var i;
        var arrows = arena.server.arrows;
        for (i = 0; i < arrows.length; i++) {
            renderArrow(arrows[i]);
        }
    };

    Arena.start = function (arena, MS_PER_UPDATE) {
        arena.local.time = Date.now();

        (function loop() {
            var isArenaUpdated = false;
            while (Date.now() > arena.local.time) {
                Arena.update(arena, MS_PER_UPDATE);
                arena.local.time += MS_PER_UPDATE;
                isArenaUpdated = true;
            }

            if (isArenaUpdated === true) {
                Arena.render(arena, MS_PER_UPDATE);
            };

            arena.local.frameRequestId = window.requestAnimationFrame(function () { loop(); });
        })();
    };

    Arena.stop = function (arena) {
        window.cancelAnimationFrame(arena.local.frameRequestId);
        arena.local.frameRequestId = undefined;
        arena.local.time = undefined;
    };


})();