(function () {

    Fight.render = function (fight) {
        var ctx = fight.ctx,
            cvs = fight.cvs,
            ship = fight.ship,
            zone = fight.zone,
            bullets = fight.bullets,
            canvasScaledWidth, canvasScaledHeight, canvasScale,
            zoneWidth = zone.max.x - zone.min.x,
            zoneHeight = zone.max.y - zone.min.y,
            padding,
            strength;

        var i, l;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, cvs.width, cvs.height);

        if (cvs.width > cvs.height) {
            canvasScaledWidth = zoneWidth;
            canvasScaledHeight = zoneWidth * (cvs.height / cvs.width);
            canvasScale = cvs.width / zoneWidth;
        } else {
            canvasScaledHeight = zoneHeight;
            canvasScaledWidth = zoneHeight * (cvs.width / cvs.height);
            canvasScale = cvs.height / zoneHeight;
        };

        ctx.scale(canvasScale, canvasScale);

        strength = 0.6;
        ctx.translate(
            (canvasScaledWidth / 2) - ((ship.position.x - (zoneWidth * 0.5)) * strength) - (zoneWidth * 0.5),
            (canvasScaledHeight / 2) - ((ship.position.y - (zoneHeight * 0.5)) * strength) - (zoneHeight * 0.5)
        );

        l = bullets.length;
        for (i = 0; i < l; i++) {
            Bullet.render(bullets[i], { ctx: ctx });
        }

        Ship.render(ship, { ctx: ctx });

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 0.3;
        padding = 0.3 / 2;
        ctx.strokeRect(zone.min.x - padding, zone.min.y - padding, zoneWidth + padding, zoneHeight + padding);
    };

})();