#### jsMock
[![Build Status](https://travis-ci.org/Ozsie/mashControl.svg?branch=master)](https://travis-ci.org/Ozsie/mashControl)
[![Coverage Status](https://coveralls.io/repos/github/Ozsie/jsmock/badge.svg?branch=master)](https://coveralls.io/github/Ozsie/jsmock?branch=master)

jsMock is a simple mocking library for JavaScript testing.
It works by replacing functions of the mocked Object with a user defined function

```
const { when } = require('../index.js')();
const fs = require('fs');

const mock = when(fs).readFileSync().then.call(function() {
  return 'Mocked content';
});

const content = fs.readFileSync('./file.txt);
console.log(content);
mock.done();
```

The above example mocks fs.readFileSync, returning 'Mocked content' instead of actually reading 'file.txt' and returning its content.

Calling mock.done() restores the original function.