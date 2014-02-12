function returns_undefined(x){
  if(x == 3) console.log('if')
  else console.log('else')
}

function returns_true_false(x){
  if(x == 3) return true;
  else return false;
}

module.exports.returns_undefined = returns_undefined;
module.exports.returns_true_false = returns_true_false;
