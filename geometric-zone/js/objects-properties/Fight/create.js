(function () {

    Fight.create = function (options) {
        var fight = {
            frameRequestId: undefined,
            time: undefined,
            ms_per_update: 1000 / 60,
            cvs: undefined,
            ctx: undefined,
            inputs: {
                leftJoystick: undefined,
                rightJoystick: undefined
            },
            zone: {
                min: Vector.create(0, 0),
                max: Vector.create(100, 100)
            },
            ship: Ship.create(),
            bullets: [],
            enemies: {},
            particles: []
        };

        Common.extendObject(fight, options);

        return fight;
    };

})();