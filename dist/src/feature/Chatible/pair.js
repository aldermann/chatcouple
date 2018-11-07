'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _NuiAPI = require('../../api/NuiAPI');

var _memoryCache = require('memory-cache');

var _memoryCache2 = _interopRequireDefault(_memoryCache);

var _lang = require('../../variable/lang');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoClient = _mongodb2.default.MongoClient;

exports.default = function (id1, id2) {
    return new Promise(function (resolve) {
        MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true
        }, function (err, db) {
            if (err) throw err;
            db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split('/')[3]).collection('users').updateOne({
                _id: id1
            }, {
                $set: {
                    status: 2,
                    timestamp: null,
                    idCouple: id2
                }
            }, function (err) {
                if (err) throw err;
                db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split('/')[3]).collection('users').updateOne({
                    _id: id2
                }, {
                    $set: {
                        status: 2,
                        timestamp: null,
                        idCouple: id1
                    }
                }, function (err) {
                    if (err) throw err;
                    db.close(null, function () {
                        _memoryCache2.default.put(id1, id2);
                        _memoryCache2.default.put(id2, id1);
                        (0, _NuiAPI.sendTemplatedMessage)(id1, process.env.PAIR_SUCCESS_TITLE || _lang.PAIR_SUCCESS_TITLE, process.env.PAIR_SUCCESS || _lang.PAIR_SUCCESS);
                        (0, _NuiAPI.sendTemplatedMessage)(id2, process.env.PAIR_SUCCESS_TITLE || _lang.PAIR_SUCCESS_TITLE, process.env.PAIR_SUCCESS || _lang.PAIR_SUCCESS);
                        resolve(true);
                    });
                });
            });
        });
    });
};