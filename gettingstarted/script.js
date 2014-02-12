function prints_on_prompt(x){
  if(x >= 3) console.log('if')
  else console.log('else')
}

function returns_true_false(x){
  if(x == 3) return true;
  else return false;
}

module.exports.prints_on_prompt = prints_on_prompt;
module.exports.returns_true_false = returns_true_false;
