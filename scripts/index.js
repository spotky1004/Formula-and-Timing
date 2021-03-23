function setCache() {
    cache.formulaUsing = {};
    cache.formulaResult = {};
    cache.formulaCost = {};
    for (let i = 0, l = displayFormulas.length; i < l; i++) {
        const ft = formulaTypes[i];
        cache.formulaUsing[ft] = [];
        cache.formulaResult[ft] = [];
        cache.formulaCost[ft] = [];
        loop1: for (let j = 0; j < 10; j++) {
            if (typeof formulas[ft][j] === "undefined" || game.formulaBought[ft][j].eq(0)) {
                cache.formulaUsing[ft].push(-1);
                cache.formulaResult[ft].push(new D(1));
                if (typeof formulas[ft][j] !== "undefined") {
                    cache.formulaCost[ft].push(formulas[ft][j].cost.bind(new D(0))());
                } else {
                    cache.formulaCost[ft].push(new D(Infinity));
                }
                continue;
            }
            const temp = formulas[ft][j].formula;
            for (let k = 0, l2 = temp.length; k < l2; k++) if (game.formulaBought[ft][j].lt(temp[k].level)) {
                cache.formulaUsing[ft].push(k-1);
                cache.formulaResult[ft].push(formulas[ft][j].formula[cache.formulaUsing[ft][j]].formulaCalc.bind(game.formulaBought[ft][j])());
                cache.formulaCost[ft].push(formulas[ft][j].cost.bind(game.formulaBought[ft][j])());
                continue loop1;
            }
            cache.formulaUsing[ft].push(temp.length-1);
            cache.formulaResult[ft].push(formulas[ft][j].formula[cache.formulaUsing[ft][j]].formulaCalc.bind(game.formulaBought[ft][j])());
            cache.formulaCost[ft].push(formulas[ft][j].cost.bind(game.formulaBought[ft][j])());
        }
    }
}

function updateAll() {
    // update basic UI
    document.getElementById("t1display").innerHTML = notation(game.t1, 4, 2);
    document.getElementById("p1display").innerHTML = notation(game.p1, 4, 2);
    document.getElementById("t1gainDisplay").innerHTML = notation(getT1Speed(), 4, 3);
    document.getElementById("aEqDisplay").innerHTML = notation(cache.formulaResult.a.reduce((a, b) => a.mul(b), new D(1)), 4, 2);
    document.getElementById("bEqDisplay").innerHTML = notation(cache.formulaResult.b.reduce((a, b) => a.mul(b), new D(1)), 4, 2);

    // update tab related
    tabData[session.tab].updateFunc();
}

function updateFormulas() {
    for (let i = 0, l = displayFormulas.length; i < l; i++) {
        const ft = displayFormulas[i];
        for (let j = 0; j < 10; j++) {
            const temp = cache.formulaUsing[ft][j];
            document.getElementById(`formulaC${i}F${j}`).classList[cache.formulaResult[ft][j].gte(game.colorizer[ft][j])&&!game.colorizer[ft][j].eq(0)?"add":"remove"]("colorize");
            if (temp != -1) {
                const tempObj = formulas[ft][j].formula[temp];
                document.getElementById(`formulaC${i}F${j}Formula`).innerHTML = textParse(tempObj.formulaDisplay, game.formulaBought[ft][j]);
                document.getElementById(`formulaC${i}F${j}Eq`).innerHTML = notation(cache.formulaResult[ft][j], 2, 2);
            } else {
                document.getElementById(`formulaC${i}F${j}Formula`).innerHTML = 1;
            }
            document.getElementById(`formulaC${i}F${j}UpgradeCost`).innerHTML = notation(cache.formulaCost[ft][j], 3, 2);
            document.getElementById(`formulaC${i}F${j}UpgradeWarp`).classList[game.p1.gte(cache.formulaCost[ft][j])?"add":"remove"]("available");
        }
    }
}
function updateModify() {
    for (let i = 0, l = modifyNames.length; i < l; i++) {
        const unlocked = game.modifyBought.includes(i);
        document.querySelector(`#modifyList > tbody > tr:nth-child(${i+1}) > td:nth-child(1)`).style.display = !unlocked ? "none" : "table-cell";
        document.querySelector(`#modifyList > tbody > tr:nth-child(${i+1}) > td:nth-child(2)`).style.display = unlocked ? "none" : "table-cell";
    }
    document.getElementById("speedDisplay").innerHTML = (game.t1Speed.lte(0) ? "×" : "/") + notation(new D(2).pow(game.t1Speed), 4, 2);
    for (let i = 0; i < displayFormulas.length; i++) {
        const ft = displayFormulas[i];
        for (let j = 0; j < 10; j++) {
            document.getElementById(`colorizerC${i}F${j}Btn`).innerHTML = `${displayFormulas[i]}<sub>${j+1}</sub> ≥ ${notation(
                game.colorizer[ft][j].eq(0) ?
                cache.formulaResult[ft][j] :
                game.colorizer[ft][j]
                , 2, 3)
            }`;
            document.getElementById(`colorizerC${i}F${j}Btn`).classList[cache.formulaUsing[ft][j]!=-1?"add":"remove"]("unlocked");
            document.getElementById(`colorizerC${i}F${j}Btn`).classList[!game.colorizer[ft][j].eq(0)?"add":"remove"]("activated");
        }
    }
}
function updateHelp() {
    
}

function buyUpgrade(type, idx) {
    if (game.p1.lt(cache.formulaCost[type][idx])) return;
    game.formulaBought[type][idx] = game.formulaBought[type][idx].add(1);
}
function buyModify(idx) {
    if (game.p1.lt(modifyCosts[idx])) return;
    game.modifyBought.push(idx);
    game.modifyBought = [...new Set(game.modifyBought)]
}
function colorizeToggle(type, idx) {
    if (game.colorizer[type][idx].eq(0)) game.colorizer[type][idx] = new D(cache.formulaResult[type][idx]);
    else game.colorizer[type][idx] = new D(0);
}

function openTab(id) {
    const ele = [...document.getElementsByClassName("tab")];
    session.tab = id;
    for (let i = 0, l = ele.length; i < l; i++) ele[i].style.display = ele[i].id == id ? tabData[id].display : "none";
}

function speedChange(num) {
    game.t1Speed = D.min(D.max(0, game.t1Speed.add(num)), 10);
}

function getT1Speed() {
    return new D(1).div(new D(2).pow(game.t1Speed))
}

function collectPoint() {
    game.p1 = cache.formulaResult.a.reduce((a, b) => a.mul(b), new D(1)).pow(cache.formulaResult.b.reduce((a, b) => a.mul(b), new D(1)));
    game.t1 = new D(0);
    save();
}

function textParse(txt="", bind=undefined) {
    return new Function("return `" + txt + "`").bind(bind)();
}