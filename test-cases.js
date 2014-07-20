var extendArguments = require('extend-arguments');

function TestCase(name, func1, func2, func3) {
    func3 = func3 || function (a, b) {return a === b;}
    var retFunc1;
    var retFunc2;
    if (func3(retFunc1 = func1(), retFunc2 = func2())) {
        console.log(['Passed test: ', name, ';'].join(''));
    }
    else {
        console.error(['Failed test: ', name, ';', ' Result 1: ', retFunc1, '; Result 2: ', retFunc2].join(''));
    }
}

extendArguments('forEach', Array.prototype.forEach);

TestCase(
    'arguments extended by single method',
    function(){
        return (function() {
            var z = []
            arguments.forEach(function(el) {
                z.push(el);
            });
            console.log(arguments);
            return z.join('');
        })('a','b', 'c')
    },
    function() {
        return 'abc';
    }
);

delete Object.prototype['forEach']

extendArguments({
    toArray: Array.prototype.slice
});


TestCase(
    'arguments extended by object literal',
    function(){
        return (function() {
            var z = arguments.toArray().map(function(el) {
                return el;
            });
            return z.join('');
        })('a','b', 'c')
    },
    function() {
        return 'abc';
    }
);

delete Object.prototype['forEach'];
delete Object.prototype['toArray'];

