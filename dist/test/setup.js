'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.expect = exports.requester = undefined;

require('babel-polyfill');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../src/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
var requester = _chai2.default.request(_app2.default);
var expect = _chai2.default.expect;
before(function (done) {
    (0, _app.runServer)(3000, done);
});
exports.requester = requester;
exports.expect = expect;