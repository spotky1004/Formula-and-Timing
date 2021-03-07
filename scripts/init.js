var displayFormulas = ["a", "b"];
var modifyNames = ["Speed Changer"];
var modifyCosts = [1e7];

var tabData = {
    formulaContainerWarp: {display: "flex", updateFunc: window.updateFormulas},
    modifyWarp: {display: "block", updateFunc: window.updateModify}
};

var session = {
    tab: "formulaContainerWarp"
};

window.onload = function() {
    // #formulaContainerWarp
    for (let continerI = 0; continerI < displayFormulas.length; continerI++) {
        var continer = document.createElement("span");
        continer.id = "formulaContiner" + continerI;
        continer.classList.add("formulaContiner");
        document.getElementById("formulaContainerWarp").append(continer);
        
        for (let formulaI = 0; formulaI < 10; formulaI++) {
            var formula = document.createElement("div");
            formula.id = `formulaC${continerI}F${formulaI}`;
            formula.classList.add("formulaWarp");
            continer.append(formula);

            var formulaInnerWarp = document.createElement("div");
            formulaInnerWarp.classList.add("formulaTxt");
            formula.append(formulaInnerWarp);

            var formulaLeft = document.createElement("span");
            formulaLeft.classList.add("formulaLeft");
            formulaLeft.innerHTML = `${displayFormulas[continerI]}<sub>${formulaI+1}</sub> = `
            formulaInnerWarp.append(formulaLeft);

            var formulaMid = document.createElement("span");
            formulaMid.id = `formulaC${continerI}F${formulaI}Formula`;
            formulaMid.classList.add("formulaMid");
            formulaMid.innerHTML = "1";
            formulaInnerWarp.append(formulaMid);
            
            var formulaRight = document.createElement("span");
            formulaRight.id = `formulaC${continerI}F${formulaI}Eq`;
            formulaRight.classList.add("formulaRight");
            formulaRight.innerHTML = "1";
            formulaInnerWarp.append(formulaRight);
            
            var formulaUpgrade = document.createElement("div");
            formulaUpgrade.id = `formulaC${continerI}F${formulaI}UpgradeWarp`;
            formulaUpgrade.classList.add("formulaUpgrade");
            formulaUpgrade.onclick = new Function(`buyUpgrade("${displayFormulas[continerI]}", ${formulaI})`);
            formulaInnerWarp.append(formulaUpgrade);

            var formulaUpgradeLeft = document.createElement("span");
            formulaUpgradeLeft.classList.add("formulaUpgradeLeft");
            formulaUpgradeLeft.innerHTML = `P<sub>1</sub> ≥ `;
            formulaUpgrade.append(formulaUpgradeLeft);

            var formulaUpgradeRIght = document.createElement("span");
            formulaUpgradeRIght.id = `formulaC${continerI}F${formulaI}UpgradeCost`;
            formulaUpgradeRIght.classList.add("formulaUpgradeRight");
            formulaUpgradeRIght.innerHTML = `0`;
            formulaUpgrade.append(formulaUpgradeRIght);
        }    
    }

    // #modifyWarp
    for (let i = 0; i < modifyNames.length; i++) {
        let modifyBuyBox = document.querySelector(`#modifyList > tbody > tr:nth-child(${i+1}) > td:nth-child(2)`);
        modifyBuyBox.onclick = new Function(`buyModify(${i})`);

        let modifyNameTxt = document.createElement("div");
        modifyNameTxt.innerHTML = modifyNames[i];
        modifyBuyBox.append(modifyNameTxt);

        let modifyBr = document.createElement("br");
        modifyBuyBox.append(modifyBr);
        
        let modifyCostTxt = document.createElement("div");
        modifyCostTxt.innerHTML = "P<sub>1</sub> ≥ " + notation(modifyCosts[i], 2);
        modifyBuyBox.append(modifyCostTxt);
    }
}

// keydown
window.onkeydown = e => {
    console.log(1);
    if (e.code == "ArrowLeft" && game.modifyBoutht.includes(0)) speedChange(1);
    if (e.code == "ArrowRight" && game.modifyBoutht.includes(0)) speedChange(-1);
};
