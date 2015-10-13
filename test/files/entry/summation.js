var addone = require('../addone');
var addtwo = require('../addtwo');

function summation(num) {
  return addone(addtwo(num));
}