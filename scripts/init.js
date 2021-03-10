var displayFormulas = ["a", "b"];
var modifyNames = ["Speed Changer", "Colorizer"];
var modifyCosts = [3e6, 1e12];

var tabData = {
    formulaContainerWarp: {display: "flex", updateFunc: window.updateFormulas},
    modifyWarp: {display: "block", updateFunc: window.updateModify},
    helpWarp: {display: "block", updateFunc: window.updateHelp}
};

var session = {
    tab: "formulaContainerWarp"
};

window.onload = function() {
    // #formulaContainerWarp
    for (let continerI = 0; continerI < displayFormulas.length; continerI++) {
        let continer = document.createElement("span");
        continer.id = "formulaContiner" + continerI;
        continer.classList.add("formulaContiner");
        document.getElementById("formulaContainerWarp").append(continer);
        
        for (let formulaI = 0; formulaI < 10; formulaI++) {
            let formula = document.createElement("div");
            formula.id = `formulaC${continerI}F${formulaI}`;
            formula.classList.add("formulaWarp");
            continer.append(formula);

            let formulaInnerWarp = document.createElement("div");
            formulaInnerWarp.classList.add("formulaTxt");
            formula.append(formulaInnerWarp);

            let formulaLeft = document.createElement("span");
            formulaLeft.classList.add("formulaLeft");
            formulaLeft.innerHTML = `${displayFormulas[continerI]}<sub>${formulaI+1}</sub> = `
            formulaInnerWarp.append(formulaLeft);

            let formulaMid = document.createElement("span");
            formulaMid.id = `formulaC${continerI}F${formulaI}Formula`;
            formulaMid.classList.add("formulaMid");
            formulaMid.innerHTML = "1";
            formulaInnerWarp.append(formulaMid);
            
            let formulaRight = document.createElement("span");
            formulaRight.id = `formulaC${continerI}F${formulaI}Eq`;
            formulaRight.classList.add("formulaRight");
            formulaRight.innerHTML = "1";
            formulaInnerWarp.append(formulaRight);
            
            let formulaUpgrade = document.createElement("div");
            formulaUpgrade.id = `formulaC${continerI}F${formulaI}UpgradeWarp`;
            formulaUpgrade.classList.add("formulaUpgrade");
            formulaUpgrade.onclick = new Function(`buyUpgrade("${displayFormulas[continerI]}", ${formulaI})`);
            formulaInnerWarp.append(formulaUpgrade);

            let formulaUpgradeLeft = document.createElement("span");
            formulaUpgradeLeft.classList.add("formulaUpgradeLeft");
            formulaUpgradeLeft.innerHTML = `P<sub>1</sub> ≥ `;
            formulaUpgrade.append(formulaUpgradeLeft);

            let formulaUpgradeRIght = document.createElement("span");
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
    // #colorizerBtnWarp (in #modifyWarp)
    for (let i = 0; i < displayFormulas.length; i++) {
        for (let j = 0; j < 10; j++) {
            let colorizerToggleBtn = document.createElement("span");
            colorizerToggleBtn.innerHTML = `${displayFormulas[i]}<sub>${j+1}</sub> ≥ ${notation(1.234234e300, 2, 0)}`;
            colorizerToggleBtn.id = `colorizerC${i}F${j}Btn`;
            colorizerToggleBtn.onclick = new Function(`colorizeToggle("${displayFormulas[i]}", ${j})`);
            document.getElementById("colorizerBtnWarp").append(colorizerToggleBtn);
        }
    }
}

// keydown
window.onkeydown = e => {
    if (e.code == "ArrowLeft" && game.modifyBought.includes(0)) speedChange(1);
    if (e.code == "ArrowRight" && game.modifyBought.includes(0)) speedChange(-1);
};