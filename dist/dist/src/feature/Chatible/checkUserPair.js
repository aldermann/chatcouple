'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _memoryCache = require('memory-cache');

var _memoryCache2 = _interopRequireDefault(_memoryCache);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var MongoClient = _mongodb2.default.MongoClient;

exports.default = function (senderId) {
    return new Promise(function (resolve) {
        if (!_memoryCache2.default.get(senderId)) {
            MongoClient.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true
            }, function (err, db) {
                if (err) throw err;
                db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split('/')[3]).collection('users').findOne({
                    _id: senderId
                }, function (err, res) {
                    if (err) console.error(err);
                    if (res) {
                        if (res.status != 3) {
                            _memoryCache2.default.put(senderId, res.status);
                            resolve(true);
                        }
                        _memoryCache2.default.put(senderId, res.idCouple);
                        resolve(false);
                    }
                });
            });
        } else {
            if (_memoryCache2.default.get(senderId) === 0 || _memoryCache2.default.get(senderId) === 1) resolve(true);
            resolve(false);
        }
    });
};