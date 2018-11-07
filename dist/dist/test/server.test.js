'use strict';

var _setup = require('./setup');

describe('Test server', function () {
    it('Test server work', function (done) {
        _setup.requester.get('/ping').end(function (err, res) {
            if (err) throw err;
            (0, _setup.expect)(res).to.have.status(200);
            done();
        });
    });
});