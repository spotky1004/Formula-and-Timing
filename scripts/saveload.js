const savePoint = "FormulaAndTimingBetaF1";

const tempGame = {
    lastTime: new Date().getTime(),
    lastTickGain: 0,
    t1: new D(0),
    t1Speed: new D(0),
    p1: new D(0),
    formulaBought: {a: new Array(10).fill(new D(0)), b: new Array(10).fill(new D(0)), c: new Array(10).fill(new D(0)), d: new Array(10).fill(new D(0))},
    modifyBought: [],
    colorizer: {a: new Array(10).fill(new D(0)), b: new Array(10).fill(new D(0)), c: new Array(10).fill(new D(0)), d: new Array(10).fill(new D(0))}
}
var game = {};

function save() {
    localStorage[savePoint] = JSON.stringify(game);
}
function load() {
  if (typeof localStorage[savePoint] !== "undefined") game = JSON.parse(localStorage[savePoint]);
    
  const cTempGame = copyObject(tempGame);
  for (var i in tempGame) if (typeof game[i] === "undefined") game[i] = cTempGame[i];

  decimalifySave();
  
  fixSave();
}
function fixSave() {
  game.formulaBought.a[0] = D.max(1, game.formulaBought.a[0]); 
}
function hardReset() {
  console.log(copyObject(tempGame));
  game = copyObject(tempGame);
  decimalifySave();
  fixSave();
}

function copyObject(obj) {
  let cObject = {};
  for (let i in obj) {
    if (Array.isArray(obj[i])) {
      cObject[i] = [];
      const tempArr = obj[i];
      for (let j = 0, l = tempArr.length; j < l; j++) {
        cObject[i].push(tempArr[j] instanceof Decimal ? new D(tempArr[j]) : tempArr[j]);
      }
    } else if (typeof obj[i] === "object" && !(obj[i] instanceof Decimal)) {
      cObject[i] = copyObject(obj[i]);
    } else {
      cObject[i] = obj[i] instanceof Decimal ? new D(obj[i]) : obj[i];
    }
  }
  return cObject;
}
function decimalifySave(part=game, tempPart=tempGame) {
  for (let i in part) {
    if (Array.isArray(tempPart[i])) {
      const tempArr = tempPart[i];
      for (let j = 0, l = tempArr.length; j < l; j++) {
        if (tempArr[j] instanceof Decimal) part[i][j] = new D(part[i][j]);
      }
    } else if (typeof tempPart[i] === "object" && !(tempPart[i] instanceof Decimal)) {
      part[i] = decimalifySave(part[i], tempPart[i]);
    } else {
      if (tempPart[i] instanceof Decimal) part[i] = new D(part[i]);
    }
  }
  return part;
}

load();