function CGR(ctx, canvasGraphics, translate, rotationAngle, scale) {
    console.log(translate, rotationAngle, scale)
    if (translate !== undefined) { ctx.translate(translate.x, translate.y); };
    if (rotationAngle !== undefined) { ctx.rotate(rotationAngle); };
    if (scale !== undefined) { ctx.scale(scale.x, scale.y); };

    function SV(v1, v2) { if (v1 !== undefined) { return v1; } else { return v2 }; };

    var elem, i, l = canvasGraphics.length;
    for (i = 0; i < l; i++) {
        elem = canvasGraphics[i];

        ctx.fillStyle = SV(elem.fillStyle, '#000000');
        ctx.strokeStyle = SV(elem.strokeStyle, '#000000');
        ctx.lineWidth = SV(elem.lineWidth, 1);

        if (elem.type === 'circle') {
            if (elem.fill === true) {
                ctx.beginPath();
                ctx.arc(elem.x, elem.y, elem.radius, 0, Math.PI * 2);
                ctx.fill();
            };
            if (elem.stroke === true) {
                ctx.beginPath();
                ctx.arc(elem.x, elem.y, elem.radius, 0, Math.PI * 2);
                ctx.stroke();
            };
        } else if (elem.type === 'polygon') {
            if (elem.fill === true) {
                ctx.beginPath();
                var i1, l1 = elem.points.length / 2;
                ctx.moveTo(elem.points[0], elem.points[1]);
                for (i1 = 1; i1 < l1; i1++) { ctx.lineTo(elem.points[i1 * 2], elem.points[(i1 * 2) + 1]); };
                ctx.closePath();
                ctx.fill();
            };
            if (elem.stroke === true) {
                ctx.beginPath();
                var i1, l1 = elem.points.length / 2;
                ctx.moveTo(elem.points[0], elem.points[1]);
                for (i1 = 1; i1 < l1; i1++) { ctx.lineTo(elem.points[i1 * 2], elem.points[(i1 * 2) + 1]); };
                ctx.closePath();
                ctx.stroke();
            };
        } else if (elem.type === 'polyline') {
            ctx.beginPath();
            var i1, l1 = elem.points.length / 2;
            ctx.moveTo(elem.points[0], elem.points[1]);
            for (i1 = 1; i1 < l1; i1++) { ctx.lineTo(elem.points[i1 * 2], elem.points[(i1 * 2) + 1]); };
            ctx.stroke();
        };
    };

    if (scale !== undefined) { ctx.scale(1 / scale.x, 1 / scale.y); };
    if (rotationAngle !== undefined) { ctx.rotate(-rotationAngle); };
    if (translate !== undefined) { ctx.translate(-translate.x, -translate.y); };
}