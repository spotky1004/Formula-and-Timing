function notation(num, dim=3, dim2=0, type=0) {
    num = new D(num);
    if (num.lt(1e5)) return num.toNumber().toFixed(dim2); 
    return num.toExponential(dim).replace('+', '');
}
var n = notation;

Decimal.prototype.mod = function(d) {
    var x = this.div(d);
    if (x.gt(1e15)) return this;
    return x.sub(x.floor(0)).mul(d);
}

const D = Decimal;