'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _NuiAPI = require('../../api/NuiAPI');

var _lang = require('../../variable/lang');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var MongoClient = _mongodb2.default.MongoClient;

exports.default = function (senderId, favorite) {
    MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split('/')[3]).collection('users').updateOne({
            _id: senderId
        }, {
            $set: {
                favorite: favorite
            }
        }, function (err) {
            if (err) console.log(error);
            db.close(null, function () {
                return (0, _NuiAPI.sendText)(senderId, process.env.GENDER_CHANGE_SUCCESS || _lang.GENDER_CHANGE_SUCCESS);
            });
        });
    });
};