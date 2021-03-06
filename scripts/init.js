var displayFormulas = ["a", "b"];

window.onload = function() {
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
}