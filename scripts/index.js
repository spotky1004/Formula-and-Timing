function setCache() {
    cache.formulaUsing = {};
    cache.formulaResult = {};
    for (let i = 0, l = displayFormulas.length; i < l; i++) {
        var ft = formulaTypes[i];
        cache.formulaUsing[ft] = [];
        cache.formulaResult[ft] = [];
        loop1: for (let j = 0; j < 10; j++) {
            if (typeof formulas[ft][j] === "undefined") {
                cache.formulaUsing[ft].push(-1);
                cache.formulaResult[ft].push(new D(1));
                continue;
            }
            var temp = formulas[ft][j].formula;
            for (let k = 0, l2 = temp.length; k < l2; k++) if (game.formulaBought[ft][j].lt(temp[k].level)) {
                cache.formulaUsing[ft].push(k-1);
                cache.formulaResult[ft].push(formulas[ft][j].formula[cache.formulaUsing[ft][j]].formulaCalc.bind(game.formulaBought[ft][j])());
                continue loop1;
            }
            cache.formulaUsing[ft].push(temp.length-1);
            cache.formulaResult[ft].push(formulas[ft][j].formula[cache.formulaUsing[ft][j]].formulaCalc.bind(game.formulaBought[ft][j])());
        }
    }
}

function updateFormulas() {
    document.getElementById("t1display").innerHTML = notation(game.t1, 4, 2);
    document.getElementById("p1display").innerHTML = notation(game.p1, 4, 2);
    document.getElementById("aEqDisplay").innerHTML = notation(cache.formulaResult.a.reduce((a, b) => a.mul(b), new D(1)), 4, 2);
    for (let i = 0, l = displayFormulas.length; i < l; i++) {
        var ft = displayFormulas[i];
        for (let j = 0; j < 10; j++) {
            var temp = cache.formulaUsing[ft][j];
            if (temp != -1) {
                var tempObj = formulas[ft][j].formula[temp];
                document.getElementById(`formulaC${i}F${j}Formula`).innerHTML = textParse(tempObj.formulaDisplay, game.formulaBought[ft][j]);
                document.getElementById(`formulaC${i}F${j}Eq`).innerHTML = notation(cache.formulaResult[ft][j], 2, 2);
            } else {
                document.getElementById(`formulaC${i}F${j}Formula`).innerHTML = 1;
            }
        }
    }
}

function collectPoint() {
    game.p1 = game.p1.add(cache.formulaResult.a.reduce((a, b) => a.mul(b), new D(1)).pow(cache.formulaResult.b.reduce((a, b) => a.mul(b), new D(1))));
    game.t1 = new D(0);
}

function textParse(txt="", bind=undefined) {
    return new Function("return `" + txt + "`").bind(bind)();
}