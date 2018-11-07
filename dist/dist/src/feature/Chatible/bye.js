'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _memoryCache = require('memory-cache');

var _memoryCache2 = _interopRequireDefault(_memoryCache);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _NuiAPI = require('../../api/NuiAPI');

var _lang = require('../../variable/lang');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var MongoClient = _mongodb2.default.MongoClient;

exports.default = function (id1) {
    var id2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) console.error(err);
        db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split('/')[3]).collection('users').updateOne({
            _id: id1
        }, {
            $set: {
                status: 0,
                timestamp: null,
                idCouple: null
            }
        }, function (err) {
            if (err) console.error(err);
            if (!id2) {
                return db.close(null, function () {
                    _memoryCache2.default.put(id1, 0);
                    (0, _NuiAPI.sendTemplatedMessage)(id1, process.env.USER_CANCEL_TITLE || _lang.USER_CANCEL_TITLE, process.env.USER_CANCEL || _lang.USER_CANCEL);
                });
            }
            db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split('/')[3]).collection('users').updateOne({
                _id: id2
            }, {
                $set: {
                    status: 0,
                    timestamp: null,
                    idCouple: null
                }
            }, function (err) {
                if (err) console.error(err);
                return db.close(null, function () {
                    _memoryCache2.default.put(id1, 0);
                    _memoryCache2.default.put(id2, 0);
                    (0, _NuiAPI.sendTemplatedMessage)(id1, process.env.USER_PP_TITLE || _lang.USER_PP_TITLE, process.env.USER1_PP || _lang.USER1_PP);
                    (0, _NuiAPI.sendTemplatedMessage)(id2, process.env.USER_PP_TITLE || _lang.USER_PP_TITLE, process.env.USER2_PP || _lang.USER2_PP);
                });
            });
        });
    });
};