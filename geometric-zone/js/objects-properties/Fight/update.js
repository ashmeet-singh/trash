(function () {

    Fight.update = function (fight) {
        var time = fight.time,
            ship = fight.ship,
            zone = fight.zone,
            bullets = fight.bullets;

        var i, l;

        Ship.update(ship, {
            zone: zone,
            time: time,
            bullets: bullets,
            leftJoystick: fight.inputs.leftJoystick,
            rightJoystick: fight.inputs.rightJoystick
        });

        l = bullets.length;
        for (i = 0; i < l; i++) {
            Bullet.update(bullets[i], { zone: zone });
        }

        fight.bullets = Destroyer.filter(fight.bullets);
    };

})();