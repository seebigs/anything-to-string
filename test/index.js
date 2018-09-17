var ATS = require('../index.js');
var nodeAsBrowser = require('node-as-browser');
nodeAsBrowser.init(global);

var divWithDesc = document.createElement('div');
divWithDesc.id = 'eyed';
divWithDesc.className = '  hello  foo-bar  ';

var things = [
    'hello',
    123,
    false,
    null,
    void 0,
    NaN,
    [],
    {},
    [1,2,3],
    { a: [1,2,3], b: { c: 2 } },
    { a: function fn1 (arg1) { arg1(); } },
    function fn2 (arg1) {
        arg1();
    },
    window,
    document,
    document.createElement('section'),
    divWithDesc,
    { '0': document.getElementsByTagName('body')[0], length: '1' },
];

var expected = '["hello","123","false","null","undefined","NaN",[],{},["1","2","3"],{"a":["1","2","3"],"b":{"c":"2"}},{"a":"function"},"function","window","document","section","div#eyed.hello.foo-bar",{"0":"body","length":"1"}]';

var expectedReparsed = [
    'hello',
    '123',
    'false',
    'null',
    'undefined',
    'NaN',
    [],
    {},
    ['1', '2', '3'],
    { a: ['1','2','3'], b: { c: '2' } },
    { a: 'function' },
    'function',
    'window',
    'document',
    'section',
    'div#eyed.hello.foo-bar',
    { '0': 'body', length: '1' },
];

var accum = [];
things.forEach(function (thing) {
    accum.push(ATS.stringify(thing));
});
accum = '[' + accum.join(',') + ']';

var allAtOnce = ATS.stringify(things);

if (accum !== expected) {
    console.log('accum failed!');
    console.log(accum);
    console.log(expected);

} else if (allAtOnce !== expected) {
    console.log('allAtOnce failed!');
    console.log(allAtOnce);
    console.log(expected);

} else {
    var reparsed = JSON.parse(allAtOnce);
    var mismatched = false;
    reparsed.forEach(function (val, key) {
        var equality;
        if (typeof val === 'object') {
            equality = JSON.stringify(val) !== JSON.stringify(expectedReparsed[key]);
        } else {
            equality = String(val) !== String(expectedReparsed[key]);
        }
        if (equality) {
            mismatched = true;
            console.log(key);
            console.log(val);
            console.log(String(val));
            console.log(expectedReparsed[key]);
            console.log(String(expectedReparsed[key]));
            console.log();
        }
    });
    if (mismatched) {
        console.log('parsing failed!');
    } else {
        console.log('All passed');
    }
}
