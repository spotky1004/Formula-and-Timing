var formulaTypes = ["a", "b", "c", "d"];

var formulas = {
    a: [
        // a1
        {
            formula: [
                {
                    level: 1,
                    formulaDisplay: "t<sub>1</sub><sup>${notation(this.sub(1).div(10).add(2), 3, 1)}</sup> mod ${notation(this.mul(100))}",
                    formulaCalc: function() {return D.pow(game.t1, this.sub(1).div(10).add(2)).mod(this.mul(100))}
                },
                {
                    level: 10,
                    formulaDisplay: "t<sub>1</sub><sup>${notation(this.sub(1).div(9).add(2), 3, 1)}</sup> mod ${notation(this.mul(100).pow(this.div(10)))}",
                    formulaCalc: function() {return D.pow(game.t1, this.sub(1).div(9).add(2)).mod(this.mul(100).pow(this.div(10)))}
                }
            ],
            cost: function() {return new D(85).mul(this).pow(this.gte(9)?this.sub(8):1)}
        },
        // a2
        {
            formula: [
                {
                    level: 1,
                    formulaDisplay: "| sin (t<sub>1</sub> / ${notation(this)})<sup>10</sup> × ${notation(this.add(1).pow(1.2), 4, 1)} | + 1",
                    formulaCalc: function() {return new D(game.t1).sin().pow(10).abs().mul(this.add(1).pow(1.2)).add(1)}
                },
                {
                    level: 5,
                    formulaDisplay: "| sin (t<sub>1</sub> / ${notation(this)})<sup>7</sup> × ${notation(this.add(1).pow(1.4), 4, 1)} | + 1",
                    formulaCalc: function() {return new D(game.t1).sin().pow(5).abs().mul(this.add(1).pow(1.4)).add(1)}
                }
            ],
            cost: function() {return new D(200).pow(this.div(4).add(1))}
        },
        // a3
        {
            formula: [
                {
                    level: 1,
                    formulaDisplay: "2[t<sup>1.2</sup>] mod ${notation(this.pow(2).mul(10), 4, 0)}",
                    formulaCalc: function() {return new D(game.t1).floor(0).mul(2).mod(this.pow(2).mul(10))}
                }
            ],
            cost: function() {return new D(4500).mul(this.add(1)).pow(this.div(7).add(1))}
        },
        // a4
        {
            formula: [
                {
                    level: 1,
                    formulaDisplay: "log<sub>${notation(new D(4).mul(new D(0.95).pow(this.sub(1))), 2, 2)}</sub> P<sub>1</sub> / log<sub>3</sub> t<sub>1</sub>",
                    formulaCalc: function() {return game.p1.add(1).log(new D(4).mul(new D(0.95).pow(this.sub(1)))).div(game.t1.add(1).log(3))}
                }
            ],
            cost: function() {return new D(1e6).pow(this.pow(1.1).div(3).add(1))}
        },
    ],
    b: [
        // b1
        {
            formula: [
                {
                    level: 1,
                    formulaDisplay: "1 + min(tan t<sub>1</sub> / 10, ${notation(this.add(2).div(10), 0, 2)})",
                    formulaCalc: function() {return new D(1).add(D.min(game.t1.tan().div(10), this.add(2).div(10)))}
                }
            ],
            cost: function() {return new D(1.5e7).mul(new D(10).pow(this)).pow(this.pow(1.3).div(4).add(1))}
        },
    ],
    c: [

    ],
    d: [

    ]
}