var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var { when } = require('../index.js')();

describe('jsMock', function() {
  var mocks = {};

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

  var mockTestFunction = function(a, b, c) { console.log(c + ' ' + b + ' ' + a) };
  var mockReturnValue = 10;
  var mockError = new Error('MOCK');

  before(function() {
    mocks.mock = when(obj).testFunction('apa', 'banan', 'kanin').then.call(mockTestFunction);
    mocks.mock2 = when(obj).testFunction2().then.return(mockReturnValue);
    mocks.mock3 = when(obj).testFunction3().then.throw(mockError);
  });

  after(function() {
    mocks.mock.done();
    mocks.mock2.done();
    mocks.mock3.done();
  });

  it('functions should be replaced with mock versions', function() {
    expect(obj.testFunction.toString()).to.equal(mockTestFunction.toString());
    expect(obj.testFunction2()).to.equal(mockReturnValue);
    expect(obj.testFunction3.bind()).to.throw(mockError);
  });

  it('passing non function to then.call should throw an error', function() {
    expect(when(obj).testFunction().then.call.bind(null, mockReturnValue)).to.throw();
  });

  it('replacing mock should result in the same restore function', function() {
    mocks.mock4 = when(obj).testFunction().then.return(mockReturnValue);
    expect(mocks.mock.done.toString()).to.equal(mocks.mock4.done.toString());
    expect(mocks.mock.backup.toString()).to.equal(mocks.mock4.backup.toString())
  });
});