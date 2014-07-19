(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.extendArguments = factory();
  }
}(this, function () {
    'use strict';
    
    var MAGIC_ARGUMENTS_TO_STRING = (function(){
        return Object.prototype.toString.call(arguments);
    })();
    
    function isArgumentsObject(what) {
        return Object.prototype.toString.call(what) === MAGIC_ARGUMENTS_TO_STRING;        
    }
    
    var storage = Object.create(null);
    var argumentsProto = Object.create(null);
    
    
    // returns value from argumentsProto 
    function mockingGetter(propName) {
        if (isArgumentsObject(this)) {
            return argumentsProto[propName];
        }
        else {
            return storage[propName];
        }
    }
    
    function mockingSetter(propName, value) {
        storage[propName] = value[0];
        return value;
    }
    
    function simpleCurry(func) {
        var args = Array.prototype.slice.call(arguments,1);
        return function() {
            return func.apply(this, args.concat(arguments));
        }
    }
    
    return function extendArguments(name, value) {
        if (typeof name === 'string') {
            if (Object.prototype[name]) {
                storage[name] = Object.prototype[name]
            }
            Object.defineProperty(Object.prototype, name, {
                set: simpleCurry(mockingSetter, name),
                get: simpleCurry(mockingGetter, name),
                enumerable: false,
                configurable: true
            });
            argumentsProto[name] = value;
        }
        else if (typeof name === 'object' && name) {
            for (var key in name) {
                if (Object.prototype.hasOwnProperty.call(name, key)) {
                    extendArguments(key, name[key]);
                }
            }
        }
        else {
            throw new TypeError('Invalid arguments for extendArguments');
        }
    };
}));


