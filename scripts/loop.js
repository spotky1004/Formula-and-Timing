var tickLength = 33, cache = {};

function loop() {
    game.lastTickGain = new Date().getTime() - game.lastTime;
    game.t1 = game.t1.add(game.t()/1000);
    game.lastTime = new Date().getTime();

    setCache();
    updateFormulas();
}

mainLoop = setInterval(loop, 33);