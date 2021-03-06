var formulaTypes = ["a", "b", "c", "d"];

var formulas = {
    a: [
        // a1
        {
            formula: [
                {
                    level: 1,
                    formulaDisplay: "t<sub>1</sub><sup>2</sup> mod ${notation(this.mul(100))}",
                    formulaCalc: function() {return D.pow(game.t1, 2).mod(new D(this).mul(100))}
                },
                {
                    level: 10,
                    formulaDisplay: "t<sub>1</sub><sup>3</sup> mod ${notation(this.mul(100).pow(2))}",
                    formulaCalc: function() {return D.pow(game.t1, 3).mod(new D(this).mul(100).pow(2))}
                }
            ],
            cost: function() {return F.pow(10, this.pow(2))}
        },
        // a2
        {
            formula: [
                {
                    level: 1,
                    formulaDisplay: "| sin (t<sub>1</sub> / ${notation(this)}) × ${notation(this.add(1).pow(2))} | + 1",
                    formulaCalc: function() {return new D(game.t1).sin().abs().mul(this.add(1).pow(2)).add(1)}
                }
            ],
            cost: function() {return new D(Infinity)}
        }
    ],
    b: [

    ],
    c: [

    ],
    d: [

    ]
}