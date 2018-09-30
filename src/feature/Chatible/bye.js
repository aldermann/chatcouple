import cache from 'memory-cache';
import mongodb from 'mongodb'
import {
    sendText,
} from '../../api/NuiAPI'

const MongoClient = mongodb.MongoClient;

export default (id1, id2 = null) => {
    MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true
    }, (err, db) => {
        db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split("/")[3]).collection('users').updateOne({
            _id: id1
        }, {
            "$set": {
                "status": 0,
                "timestamp": null,
                "idCouple": null
            }
        }, err => {
            if (err) console.error(err)
            if (!id2) {
                return db.close(null, () => {
                    sendText(id1, process.env.USER_CANCEL);
                })
            }
            db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split("/")[3]).collection('users').updateOne({
                    _id: id2
                }, {
                    "$set": {
                        "status": 0,
                        "timestamp": null,
                        "idCouple": null
                    }
                },
                err => {
                    if (err) console.error(err);
                    return db.close(null, () => {
                        sendText(id1, process.env.USER1_PP)
                        sendText(id2, process.env.USER2_PP)
                    })
                })
        })
    })
}