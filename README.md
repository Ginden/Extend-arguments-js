# extendArguments.js

## Why?
Because I can. You probably shouldn't use this - it's just a proof of concept.

## How to install?

```bash
npm install extend-arguments
```

## How can I use this?

### Basic usage
```javascript
var extendArguments = require('extend-arguments');

extendArguments('foo', 'bar');
extendArguments('forEach', Array.prototype.forEach);




// returns 'bar'
(function() {
   return arguments.foo;
})()

// logs 'a', 'b', 'c'
(function() {
    arguments.forEach(console.log.bind(console));
})('a','b', 'c') 

// TypeError: (intermediate value).forEach is not a function

({0: 1, length: 1}).forEach(console.log.bind(console));

// defining properties on Object.prototype don't break extensions of arguments object
Object.prototype.forEach = function() {
    throw new Error('Just testing.');
}

// Error: Just testing
({0: 1, length: 1}).forEach(console.log.bind(console));

// logs 'a', 'b', 'c'
(function() {
    arguments.forEach(console.log.bind(console));
})('a','b', 'c') 
```

### Extend by object

#### Extend by literal

```javascript
extendArguments({
    forEach: Array.prototype.forEach,
    toArray: Array.prototype.slice
});
```


#### Extend by Array methods
```javascript
var methodsFromArray = {};
Object.getOwnPropertyNames(Array.prototype).forEach(function(el) {
    methodsFromArray[el] = Array.prototype[el];
});

extendArguments(
    methodsFromArray
);
```

## How does it work?


## TODO:

### ArgumentsPrototype object

```javascript
ArgumentsPrototype.foo = 'bar';
(function() {
    return arguments.foo;
}); // bar
```
Requires ES6 Proxies.

## Compatibility:
Tested:
* Firefox 29
* Chromium 34
* Node.js 0.10.25

Should work:
* IE 9+
* Firefox 4+
* Chrome 5+
