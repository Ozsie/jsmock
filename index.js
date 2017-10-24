module.exports = function() {
  var restores = {};
  var r = function(toMock, functionName) {
    var restore = {
      backup: toMock[functionName],
      done: function() { toMock[functionName] = this.backup; }
    };
    return restore;
  };

  var t = function(toMock, functionName) {
    return {
      then: {
        call: function(func) {
          if (typeof func === 'function') {
            var key = `${toMock.constructor.name}.${functionName}`;
            if (restores[key]) { restores[key].done(); }
            restores[key] = r(toMock, functionName);
            toMock[functionName] = func;
            return restores[key];
          } else {
            throw new Error('then.call() must take a function as argument');
          }
        },
        return: function(value) {
          return this.call(function() { return value; });
        },
        throw: function(error) {
          return this.call(function() { throw error; });
        }
      }
    };
  };

  var createFunction = function(toMock, fName) {
    var func = function() {
      return t(func.toMock, func.mockName);
    };
    func.mockName = fName;
    func.toMock = toMock;
    return func;
  };

  var w = function(toMock) {
    var mock = {};
    for (var fName in toMock) {
      if (typeof toMock[fName] === 'function') {
        mock[fName] = createFunction(toMock, fName);
      }
    }
    return mock;
  };

  return { when: w };
};