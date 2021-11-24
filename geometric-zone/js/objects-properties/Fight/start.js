(function () {

    Fight.start = function (fight) {
        if (fight.time === undefined) { fight.time = Date.now(); }

        (function loop() {
            var time = Date.now();

            if (time > fight.time) {
                Fight.beforeTick(fight);
                while (time > fight.time) {
                    Fight.update(fight);
                    fight.time += fight.ms_per_update;
                }
                Fight.render(fight);
                Fight.afterTick(fight);
            }

            fight.frameRequestId = window.requestAnimationFrame(function () { loop(); });
        })();
    };

})();