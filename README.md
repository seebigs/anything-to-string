# anything-to-string

**Convert ANYTHING in JavaScript to a String**

Supports
- Elements
- Objects
- Arrays
- Window
- Document
- Null
- Undefined
- jQuery
- etc.

## Install
```
$ npm install anything-to-string --save
```

## Use
```js
var anythingToString = require('anything-to-string');

anythingToString.stringify(document.getElementsByTagName('div')[0]);
// div#id.class
```
