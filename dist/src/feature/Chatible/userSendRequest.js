'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _memoryCache = require('memory-cache');

var _memoryCache2 = _interopRequireDefault(_memoryCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoClient = _mongodb2.default.MongoClient;

exports.default = function (senderId, timestamp) {
    return new Promise(function (resolve) {
        MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true
        }, function (err, db) {
            if (err) throw err;
            db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split('/')[3]).collection('users').updateOne({
                _id: senderId
            }, {
                $set: {
                    status: 1,
                    timestamp: timestamp
                }
            }, function (err, obj) {
                if (err) throw err;
                db.close(null, function () {
                    _memoryCache2.default.put(senderId, 1);
                    resolve(obj);
                });
            });
        });
    });
};