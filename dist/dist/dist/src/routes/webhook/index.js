'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bot = require('./bot');

var _findUser = require('../../feature/Chatible/findUser');

var _findUser2 = _interopRequireDefault(_findUser);

var _pair = require('../../feature/Chatible/pair');

var _pair2 = _interopRequireDefault(_pair);

var _memoryCache = require('memory-cache');

var _memoryCache2 = _interopRequireDefault(_memoryCache);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var Router = _express2.default.Router();

Router.post('/', function (req, res) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = req.body.entry[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var entry = _step.value;

            var _loop = function _loop(message) {
                var senderId = message.sender.id;
                var timestamp = message.timestamp;
                if (message.postback) {
                    (0, _bot.processPostback)(senderId, message.postback.payload, timestamp);
                } else if (message.message) {
                    if (message.message.quick_reply) {
                        // Handle quick replies
                        (0, _bot.processPostback)(senderId, message.message.quick_reply.payload, timestamp);
                    } else if (message.message.text) {
                        // User gửi text
                        (0, _bot.handleText)(senderId, message.message.text, timestamp);
                    } else if (message.message.attachments) {
                        message.message.attachments.forEach(function (v) {
                            (0, _bot.handleText)(senderId, v.payload.url, timestamp, v.type);
                        });
                    }
                }
            };

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = entry.messaging[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var message = _step2.value;

                    _loop(message);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    res.sendStatus(200);
});

Router.post('/pair', function () {
    var _ref = (0, _asyncToGenerator3.default)(
    /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var result;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return Promise.all([(0, _findUser2.default)(req.body.id1), (0, _findUser2.default)(req.body.id2)]);

                    case 2:
                        result = _context.sent;

                        console.log(result);

                        if (!((result[0] === 0 || result[0] === 1) && (result[1] === 0 || result[1] === 1))) {
                            _context.next = 7;
                            break;
                        }

                        (0, _pair2.default)(req.body.id1, req.body.id2);
                        return _context.abrupt('return', res.send('Ok'));

                    case 7:
                        return _context.abrupt('return', res.send('Something went wrong'));

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

Router.get('/debug', function (req, res) {
    res.send('OK');
});

exports.default = Router;