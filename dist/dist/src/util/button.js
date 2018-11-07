'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function (type, content, title) {
    var _ref;

    return _ref = {
        type: type
    }, (0, _defineProperty3.default)(_ref, type === 'web_url' ? 'url' : 'payload', content), (0, _defineProperty3.default)(_ref, 'title', title), _ref;
};