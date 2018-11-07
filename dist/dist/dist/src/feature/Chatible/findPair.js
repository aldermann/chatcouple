'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _checkUserPair = require('./checkUserPair');

var _checkUserPair2 = _interopRequireDefault(_checkUserPair);

var _pair = require('./pair');

var _pair2 = _interopRequireDefault(_pair);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var MongoClient = _mongodb2.default.MongoClient;

exports.default = function () {
    MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split('/')[3]).collection('users').find({
            status: 1
        }).toArray(function () {
            var _ref = (0, _asyncToGenerator3.default)(
            /*#__PURE__*/_regenerator2.default.mark(function _callee(err, obj) {
                var i, user2, arrCheck;
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
                                if (!(obj.length > 1)) {
                                    _context.next = 16;
                                    break;
                                }

                                i = 0;

                            case 4:
                                if (!(i < obj.length)) {
                                    _context.next = 16;
                                    break;
                                }

                                _context.next = 7;
                                return findUser2(obj[i]._id, obj[i].favorite, obj[i].gender);

                            case 7:
                                user2 = _context.sent;
                                _context.next = 10;
                                return Promise.all([(0, _checkUserPair2.default)(obj[i]._id), (0, _checkUserPair2.default)(user2)]);

                            case 10:
                                arrCheck = _context.sent;

                                if (!(arrCheck[0] && arrCheck[1])) {
                                    _context.next = 13;
                                    break;
                                }

                                return _context.abrupt('return', (0, _pair2.default)(obj[i]._id, user2));

                            case 13:
                                ++i;
                                _context.next = 4;
                                break;

                            case 16:
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
    });
};

function findUser2(senderId, senderFav, senderGen) {
    return new Promise(function (resolve) {
        MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true
        }, function (err, db) {
            if (err) throw err;
            if (senderFav === 'any') {
                db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split('/')[3]).collection('users').find({
                    $or: [{
                        favorite: senderGen
                    }, {
                        favorite: 'any'
                    }],
                    status: 1,
                    _id: {
                        $ne: senderId
                    }
                }).toArray(function (err, obj) {
                    if (err) throw err;
                    if (obj.length === 0) return null;else {
                        return resolve(obj[0]._id);
                    }
                });
            } else {
                db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split('/')[3]).collection('users').find({
                    $or: [{
                        favorite: senderGen
                    }, {
                        favorite: 'any'
                    }],
                    gender: senderFav,
                    status: 1,
                    _id: {
                        $ne: senderId
                    }
                }).toArray(function (err, obj) {
                    if (err) throw err;
                    if (obj.length === 0) return null;else {
                        return resolve(obj[0]._id);
                    }
                });
            }
        });
    });
}