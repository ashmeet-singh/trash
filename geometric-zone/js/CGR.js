/* Canvas Graphics Renderer */

function CGR(options) {
    /* Get Defined Value */
    function GDV() {
        var i;
        for (i = 0; i < arguments.length; i++) {
            if (arguments[i] !== undefined) { return arguments[i]; }
        }
    }

    var ctx = options.ctx;
    var CG = options.CG;
    var translate = GDV(options.translate, Vector.create(0, 0));
    var rotate = GDV(options.rotate, 0) + GDV(CG.rotate, 0);
    var scale = GDV(options.scale, Vector.create(1, 1));
    var parts = CG.parts;

    ctx.translate(translate.x, translate.y);
    ctx.rotate(rotate);
    ctx.scale(scale.x, scale.y);

    var part, i, l = parts.length;
    for (i = 0; i < l; i++) {
        part = parts[i];

        ctx.fillStyle = GDV(part.fillStyle, '#000000');
        ctx.strokeStyle = GDV(part.strokeStyle, '#000000');
        ctx.lineWidth = GDV(part.lineWidth, 1);

        var points;
        if (part.type === 'circle') {
            if (part.fill === true) {
                ctx.beginPath();
                ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
                ctx.fill();
            };
            if (part.stroke === true) {
                ctx.beginPath();
                ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
                ctx.stroke();
            };
        } else if (part.type === 'polygon') {
            points = part.points;
            if (part.fill === true) {
                ctx.beginPath();
                var i1, l1 = points.length / 2;
                ctx.moveTo(points[0], points[1]);
                for (i1 = 1; i1 < l1; i1++) { ctx.lineTo(points[i1 * 2], points[(i1 * 2) + 1]); };
                ctx.closePath();
                ctx.fill();
            };
            if (part.stroke === true) {
                ctx.beginPath();
                var i1, l1 = points.length / 2;
                ctx.moveTo(points[0], points[1]);
                for (i1 = 1; i1 < l1; i1++) { ctx.lineTo(points[i1 * 2], points[(i1 * 2) + 1]); };
                ctx.closePath();
                ctx.stroke();
            };
        } else if (part.type === 'polyline') {
            points = part.points;
            ctx.beginPath();
            var i1, l1 = points.length / 2;
            ctx.moveTo(points[0], points[1]);
            for (i1 = 1; i1 < l1; i1++) { ctx.lineTo(points[i1 * 2], points[(i1 * 2) + 1]); };
            ctx.stroke();
        };
    };

    ctx.scale(1 / scale.x, 1 / scale.y);
    ctx.rotate(-rotate);
    ctx.translate(-translate.x, -translate.y);
}