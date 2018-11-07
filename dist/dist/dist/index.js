'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _app = require('./src/app');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

_dotenv2.default.config();

(0, _app.runServer)(process.env.PORT || 3000);