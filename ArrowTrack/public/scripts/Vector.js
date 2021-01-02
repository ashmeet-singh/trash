var Vector = {};

(function () {

    Vector.create = function (x, y) {
        return { x: x || 0, y: y || 0 };
    };

    Vector.clone = function (vector) {
        return { x: vector.x, y: vector.y };
    };

    Vector.magnitude = function (vector) {
        return Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
    };

    Vector.magnitudeSquared = function (vector) {
        return (vector.x * vector.x) + (vector.y * vector.y);
    };

    Vector.rotate = function (vector, angle, output) {
        var cos = Math.cos(angle), sin = Math.sin(angle);
        if (!output) output = {};
        var x = vector.x * cos - vector.y * sin;
        output.y = vector.x * sin + vector.y * cos;
        output.x = x;
        return output;
    };

    Vector.rotateAbout = function (vector, angle, point, output) {
        var cos = Math.cos(angle), sin = Math.sin(angle);
        if (!output) output = {};
        var x = point.x + ((vector.x - point.x) * cos - (vector.y - point.y) * sin);
        output.y = point.y + ((vector.x - point.x) * sin + (vector.y - point.y) * cos);
        output.x = x;
        return output;
    };

    Vector.normalise = function (vector) {
        var magnitude = Vector.magnitude(vector);
        if (magnitude === 0)
            return { x: 0, y: 0 };
        return { x: vector.x / magnitude, y: vector.y / magnitude };
    };

    Vector.dot = function (vectorA, vectorB) {
        return (vectorA.x * vectorB.x) + (vectorA.y * vectorB.y);
    };

    Vector.cross = function (vectorA, vectorB) {
        return (vectorA.x * vectorB.y) - (vectorA.y * vectorB.x);
    };

    Vector.cross3 = function (vectorA, vectorB, vectorC) {
        return (vectorB.x - vectorA.x) * (vectorC.y - vectorA.y) - (vectorB.y - vectorA.y) * (vectorC.x - vectorA.x);
    };

    Vector.add = function (vectorA, vectorB, output) {
        if (!output) output = {};
        output.x = vectorA.x + vectorB.x;
        output.y = vectorA.y + vectorB.y;
        return output;
    };

    Vector.sub = function (vectorA, vectorB, output) {
        if (!output) output = {};
        output.x = vectorA.x - vectorB.x;
        output.y = vectorA.y - vectorB.y;
        return output;
    };

    Vector.mult = function (vector, scalar) {
        return { x: vector.x * scalar, y: vector.y * scalar };
    };

    Vector.div = function (vector, scalar) {
        return { x: vector.x / scalar, y: vector.y / scalar };
    };

    Vector.perp = function (vector, negate) {
        negate = negate === true ? -1 : 1;
        return { x: negate * -vector.y, y: negate * vector.x };
    };

    Vector.neg = function (vector) {
        return { x: -vector.x, y: -vector.y };
    };

    Vector.angle = function (vectorA, vectorB) {
        return Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x);
    };

})();