(function () {

    View.initializeElements();

    var fight;

    function startFight() {
        View.hide(['#MainMenu']);
        View.show(['#LeftJoystick', '#RightJoystick', '#PauseIcon']);

        var cvs = QS('#MainCanvas');
        var ctx = cvs.getContext('2d', { alpha: false });
        fight = Fight.create({
            cvs: cvs,
            ctx: ctx,
            inputs: {
                leftJoystick: JoystickHandler.create(QS('#LeftJoystick')).enable(),
                rightJoystick: JoystickHandler.create(QS('#RightJoystick')).enable(),
            }
        });

        Fight.start(fight);
    }

    function pauseFight() {
        Fight.stop(fight);
        View.hide(['#LeftJoystick', '#RightJoystick', '#PauseIcon']);
        View.show(['#PauseMenu'], 'flex');
    }

    function resumeFight() {
        View.hide(['#PauseMenu']);
        View.show(['#LeftJoystick', '#RightJoystick', '#PauseIcon']);
        Fight.start(fight);
    }

    function exitFight() {
        Fight.stop(fight);
        fight.inputs.leftJoystick.disable();
        fight.inputs.rightJoystick.disable();
        fight = undefined;
        View.clearMainCanvas();
        View.hide(['#LeftJoystick', '#RightJoystick', '#PauseIcon', '#PauseMenu']);
        View.show(['#MainMenu'], 'flex');
    }

    function restartFight() {
        exitFight();
        startFight();
    }

    QS('#FullscreenIcon').addEventListener('click', function () { View.switchToFullscreen(); });
    QS('#Play').addEventListener('click', function () { startFight(); });
    QS('#PauseIcon').addEventListener('click', function () { pauseFight(); });
    QS('#ResumeFight').addEventListener('click', function () { resumeFight(); });
    QS('#ExitFight').addEventListener('click', function () { exitFight(); });
    QS('#RestartFight').addEventListener('click', function () { restartFight(); });
})();