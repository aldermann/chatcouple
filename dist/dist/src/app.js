'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.runServer = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _webhook = require('./routes/webhook');

var _webhook2 = _interopRequireDefault(_webhook);

var _chatfuel = require('./routes/chatfuel');

var _chatfuel2 = _interopRequireDefault(_chatfuel);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0, _express2.default)();

_dotenv2.default.config();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
    extended: true
}));
app.get('/ping', function (_, res) {
    return res.send('pong');
});

app.use('/chatfuel', _chatfuel2.default);
app.use('/webhook', _webhook2.default);

function runServer() {
    var _this = this;

    var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.env.PORT || 3000;
    var done = arguments[1];

    app.listen(port, function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(err) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!err) {
                                _context.next = 2;
                                break;
                            }

                            throw err;

                        case 2:
                            console.log('Listening at port ' + port);
                            if (done) done();

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x2) {
            return _ref.apply(this, arguments);
        };
    }());
}

exports.default = app;
exports.runServer = runServer;