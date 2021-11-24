(function () {

    Fight.stop = function (fight) {
        window.cancelAnimationFrame(fight.frameRequestId);
        fight.frameRequestId = undefined;
        fight.time = undefined;
    };

})();