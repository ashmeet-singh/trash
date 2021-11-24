var Ship = {};

(function () {

    Ship.create = function (options) {
        var ship = {
            position: Vector.create(50, 50),
            velocity: Vector.create(0, 0),
            direction: Vector.create(0, -1),
            maxSpeed: 0.7,
            hearts: 3,
            radius: 1,
            weapons: {
                gun: {
                    lastFired: 0,
                    firingInterval: 200
                }
            }
        };

        Common.extendObject(ship, options);

        return ship;
    };

    Ship.CG = {
        rotate: 1.57,
        parts: [{
            type: 'polyline',
            stroke: true,
            strokeStyle: '#ffffff',
            lineWidth: 0.4,
            points: [0.7, -0.7, 1, 0, 0, 1, -1, 0, -0.7, -0.7]
        }]
    };

    Ship.update = function (ship, options) {
        var zone = options.zone,
            time = options.time,
            bullets = options.bullets,
            leftJoystick = options.leftJoystick,
            rightJoystick = options.rightJoystick;

        if (leftJoystick.isActive) {
            ship.direction = Vector.clone(leftJoystick.direction);
            ship.velocity = Vector.mult(leftJoystick.direction, ship.maxSpeed);
        } else {
            ship.velocity = Vector.create(0, 0);
        }

        Vector.add(ship.position, ship.velocity, ship.position);

        CollisionResolver.putCircleInRect(ship, zone);

        if (rightJoystick.isActive) {
            var gun = ship.weapons.gun;
            if (time - gun.lastFired > gun.firingInterval) {
                var firingMargin = 2 + ship.radius,
                    bulletSpeed = 1.4;

                bullets.push(Bullet.create({
                    position: Vector.add(ship.position, Vector.mult(rightJoystick.direction, firingMargin)),
                    velocity: Vector.mult(rightJoystick.direction, bulletSpeed)
                }));

                gun.lastFired = time;
            };
        }
    };

    Ship.render = function (ship, options) {
        CGR({
            ctx: options.ctx,
            CG: Ship.CG,
            translate: ship.position,
            rotate: Vector.angle(Vector.create(0, 0), ship.direction),
            scale: Vector.create(ship.radius, ship.radius)
        });
    };

})();