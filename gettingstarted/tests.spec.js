var assert = require('assert')
var functionsBundle = require(__dirname + '/script')

/*beforeEach(function(){
  console.log('before every test');
})*/

describe('Function a()', function(){
  it('should return true when the value is 3', function(){
      assert.equal(undefined, functionsBundle.returns_undefined(3));
      assert.equal(true, functionsBundle.returns_true_false(3));
  })
})


  //it('should return true when the value is not present', function(){








//Synchronouos code
/*describe('Array', function(){
  describe('#indexOf', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      //assert.equal(-1, [1,2,3].indexOf(1));
    })
  })
})*/

//Asynchronous code
/*describe('User', function(){
  describe('#save()', function(){
    it('should save without error', function(done){
      var user = new User('Luna');
      user.save(function(err){
        if(err) throw err;
        done();
      })
    })
  })
})*/
