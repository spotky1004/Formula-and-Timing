let tickLength = 33, cache = {};

function loop() {
    game.lastTickGain = new Date().getTime() - game.lastTime;
    game.t1 = game.t1.add(new D(game.lastTickGain/1000).mul(getT1Speed()));
    game.lastTime = new Date().getTime();

    setCache();
    updateAll();
}

mainLoop = setInterval(loop, 33);
saveLoop = setInterval(save, 5000);