import cache from 'memory-cache';
import mongodb from 'mongodb'
import {
    getUserData
} from '../../api/NuiAPI'

const MongoClient = mongodb.MongoClient;

export default (senderId, timestamp) => {
    return new Promise(resolve => {
        if (!cache.get(senderId)) {
            MongoClient.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true
            }, (err, db) => {
                if (err) console.error(err);
                db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split("/")[3]).collection("users").findOne({
                    _id: senderId
                }, async (err, res) => {
                    if (err) console.error(err);
                    if (!res) {
                        db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split("/")[3]).collection("users").insertOne(Object.assign({}, await getUserData(senderId), {
                            status: 0,
                            timestamp: null,
                            favorite: "any",
                            createAt: timestamp,
                            _id: senderId,
                        }), err => {
                            if (err) console.error(err);
                            cache.put(senderId, 0);
                        })
                    }
                    db.close(null, () => resolve(null))
                })
            })
        } else resolve(null)
    })
}