View.initializeElements();
var arena = Arena.create();
var controls = Controller.initialize();

function addArrow(callback) {
    Server.send('addArrow', {}, function (x) {
        arena.arrowPrivateId = x.arrow.privateId;
        arena.arrowPublicId = x.arrow.privateId;
        callback();
    });
}

var isServerArenaUpdating = false;
function startUpdatingServerArena(onStart, onEnd) {
    isServerArenaUpdating = true;
    var isStarted = false;
    function loop() {
        Server.send('setControlsAndGetArena',
            { privateId: arena.arrowPrivateId, controls: controls },
            function (x) {
                if (x.success === true && isServerArenaUpdating === true) {
                    arena.server = x.arena;
                    if (isStarted === false) {
                        isStarted = true;
                        onStart();
                    }
                    loop();
                } else {
                    onEnd();
                };
            }
        );
    }
    loop();
}

function stopUpdatingServerArena() { isServerArenaUpdating = false; }

addArrow(function () {
    startUpdatingServerArena(function () {
        Arena.start(arena, 1000 / 60);
    });
});

