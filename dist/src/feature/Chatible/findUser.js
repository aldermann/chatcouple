'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _memoryCache = require('memory-cache');

var _memoryCache2 = _interopRequireDefault(_memoryCache);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _NuiAPI = require('../../api/NuiAPI');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoClient = _mongodb2.default.MongoClient;

exports.default = function (senderId) {
    var timestamp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    return new Promise(function (resolve) {
        if (!_memoryCache2.default.get(senderId)) {
            MongoClient.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true
            }, function (err, db) {
                if (err) console.error(err);
                db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split('/')[3]).collection('users').findOne({
                    _id: senderId
                }, function () {
                    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(err, res) {
                        return _regenerator2.default.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        if (err) console.error(err);

                                        if (res) {
                                            _context.next = 14;
                                            break;
                                        }

                                        _context.t0 = db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split('/')[3]).collection('users');
                                        _context.t1 = Object;
                                        _context.t2 = {};
                                        _context.next = 7;
                                        return (0, _NuiAPI.getUserData)(senderId);

                                    case 7:
                                        _context.t3 = _context.sent;
                                        _context.t4 = {
                                            status: 0,
                                            timestamp: null,
                                            favorite: 'any',
                                            createAt: timestamp,
                                            _id: senderId,
                                            idCouple: null
                                        };
                                        _context.t5 = _context.t1.assign.call(_context.t1, _context.t2, _context.t3, _context.t4);

                                        _context.t6 = function (err) {
                                            if (err) console.error(err);
                                            _memoryCache2.default.put(senderId, 0);
                                            db.close(null, function () {
                                                return resolve(0);
                                            });
                                        };

                                        _context.t0.insertOne.call(_context.t0, _context.t5, _context.t6);

                                        _context.next = 15;
                                        break;

                                    case 14:
                                        if (res.idCouple) {
                                            _memoryCache2.default.put(senderId, res.idCouple);
                                            db.close(null, function () {
                                                return resolve(res.idCouple);
                                            });
                                        } else {
                                            _memoryCache2.default.put(senderId, res.status);
                                            db.close(null, function () {
                                                return resolve(res.status);
                                            });
                                        }

                                    case 15:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, _callee, undefined);
                    }));

                    return function (_x2, _x3) {
                        return _ref.apply(this, arguments);
                    };
                }());
            });
        } else resolve(_memoryCache2.default.get(senderId));
    });
};