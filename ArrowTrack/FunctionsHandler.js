function FunctionsHandler(functions, store) {

    function isPlainObject(x) {
        return (Object.prototype.toString.call(x) === '[object Object]');
    }

    function isString(x) {
        return (typeof x === 'string');
    }

    function newFunctionsHandler(req, res) {
        var resString = 'Error!';
        try {
            if (isString(req.body)) {
                var body = JSON.parse(req.body);
                if (isPlainObject(body) && isString(body.F) && functions[body.F] !== undefined && isPlainObject(body.X)) {
                    var tempRes = functions[body.F](store, body.X);
                    if (isPlainObject(tempRes)) { resString = JSON.stringify(tempRes); };
                }
            }
        }
        catch (E) {
        }
        finally {
            res.type('text/plain');
            res.send(resString);
        }
    };

    return newFunctionsHandler;
}

module.exports = FunctionsHandler;