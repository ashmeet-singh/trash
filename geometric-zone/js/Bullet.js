var Bullet = {};

(function () {

    Bullet.create = function (options) {
        var bullet = {
            position: Vector.create(0, 0),
            velocity: Vector.create(1, 0),
        };

        Common.extendObject(bullet, options);

        return bullet;
    };

    Bullet.update = function (bullet, options) {
        var zone = options.zone;
        Vector.add(bullet.position, bullet.velocity, bullet.position);
        var p = bullet.position;
        var min = zone.min;
        var max = zone.max;
        if (p.x < min.x || p.x > max.x || p.y < min.y || p.y > max.y) { Destroyer.mark(bullet); };
    };

    Bullet.render = function (bullet, options) {
        var ctx = options.ctx;
        var lineLength = 2;
        var p = Vector.clone(bullet.position);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = '#ffff00';
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        Vector.sub(p, Vector.mult(Vector.normalise(bullet.velocity), lineLength), p);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
    };

})();