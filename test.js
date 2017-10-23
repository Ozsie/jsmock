var { when } = require('./index.js')();

var obj = {
  testFunction: function(a, b, c) {
    console.log(a + ' ' + b + ' ' + c);
  },
  testFunction2: function() {
    return 5;
  },
  testFunction3: function() {
    throw new Error();
  }
};

var obj2 = {
  testFunction: function(a, b, c) {
    console.log(a + ' och ' + b + ' och ' + c);
  }
};

obj.testFunction('apa', 'banan', 'kanin');
console.log(obj.testFunction2());
obj2.testFunction('apa', 'banan', 'kanin');

var mock = when(obj).testFunction('apa', 'banan', 'kanin').then.call(function(a, b, c) { console.log(c + ' ' + b + ' ' + a) });
var mock2 = when(obj).testFunction2().then.return(10);
var mock3 = when(obj2).testFunction('apa', 'banan', 'kanin').then.call(function(a,b,c) { console.log(a+b+c); });

obj.testFunction('apa', 'banan', 'kanin');
console.log(obj.testFunction2());
obj2.testFunction('apa', 'banan', 'kanin');

console.log('----------------------------------------');

mock.done();
obj.testFunction('apa', 'banan', 'kanin');
mock2.done();
console.log(obj.testFunction2());
mock3.done();
obj2.testFunction('apa', 'banan', 'kanin');
