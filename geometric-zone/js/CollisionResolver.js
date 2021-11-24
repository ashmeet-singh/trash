var CollisionResolver = {};

(function () {

    CollisionResolver.putCircleInRect = function (circle, rect) {
        var min = rect.min;
        var max = rect.max;
        var p = circle.position;
        var r = circle.radius;
        if ((p.x - r) < min.x) { p.x = r + min.x; } else if ((p.x + r) > max.x) { p.x = max.x - r; };
        if ((p.y - r) < min.y) { p.y = r + min.y; } else if ((p.y + r) > max.y) { p.y = max.y - r; };
        return circle;
    };

    CollisionResolver.bounceCircleInRect = function (circle, rect) {
        var min = rect.min;
        var max = rect.max;
        var p = circle.position;
        var v = circle.velocity;
        var r = circle.radius;
        if ((p.x - r) < min.x) { p.x = r + min.x; v.x = -v.x; } else if ((p.x + r) > max.x) { p.x = max.x - r; v.x = -v.x; };
        if ((p.y - r) < min.y) { p.y = r + min.y; v.y = -v.y; } else if ((p.y + r) > max.y) { p.y = max.y - r; v.y = -v.y; };
        return circle;
    };

})();