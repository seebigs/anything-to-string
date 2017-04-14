var ATS = require('../index.js');
var nodeAsBrowser = require('node-as-browser');
nodeAsBrowser.init(global);

var dollar = require('dollar-js');

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
    dollar('body')
];

var expected = '[hello,123,false,null,undefined,NaN,[],{},[1,2,3],{a:[1,2,3],b:{c:2}},{a:function},function,window,document,section,div#eyed.hello.foo-bar,{0:body,length:1}]';

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
    console.log('All passed');
}
