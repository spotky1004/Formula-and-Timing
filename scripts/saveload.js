var game = {
    lastTime: new Date().getTime(),
    lastTickGain: 0,
    t: function() {return this.lastTickGain},
    t1: new D(0),
    p1: new D(0),
    formulaBought: {a: new Array(10).fill(new D(1)), b: new Array(10).fill(new D(0)), c: new Array(10).fill(new D(0)), d: new Array(10).fill(new D(0))}
}
game.formulaBought.a[0] = new D(1);