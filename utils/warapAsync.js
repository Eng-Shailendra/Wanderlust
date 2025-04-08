function wrapAsync(fm) {
    return function (req, res, next) {
        fm(req, res, next).catch(next);
    }
}

module.exports = wrapAsync;