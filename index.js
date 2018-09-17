/**
 * Convert an ANYTHING in JavaScript into a string
 *   Elements, Objects, Arrays, Null, etc.
 *   Be as descriptive as possible, but safely fallback no matter what
 */

function stringify(val) {
    if (val) {
        if (typeof val === 'function') {
            return '"function"';

        } else if (typeof val === 'object') {
            if (Array.isArray(val)) {
                var arr = [];
                val.forEach(function (v) {
                    arr.push(stringify(v));
                });
                return '[' + arr.join(',') + ']';

            } else if (val === val.self) {
                return '"window"';

            } else if (val.nodeType === 9) {
                return '"document"';

            } else if (val.nodeType === 1) {
                var elem = (val.tagName || '').toLowerCase();

                if (val.id) {
                    elem += '#' + val.id;
                }

                if (val.className && typeof val.className === 'string') {
                    elem += '.' + val.className.trim().replace(/ +/g, '.');
                }

                return '"' + elem + '"';

            } else {
                var obj = [];
                for (var x in val) {
                    if (val.hasOwnProperty(x)) {
                        var actual = val[x];
                        if (typeof actual !== 'undefined') {
                            obj.push('"' + x + '":' + stringify(actual));
                        }
                    }
                }
                return '{' + obj.join(',') + '}';
            }
        }

        return '"' + val + '"';
    }

    return '"' + val + '"';
}

module.exports = {
    stringify: stringify
};
