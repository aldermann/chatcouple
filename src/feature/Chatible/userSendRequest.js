import mongodb from 'mongodb';
import cache from 'memory-cache';
const MongoClient = mongodb.MongoClient;

export default (senderId, timestamp) => {
    return new Promise(resolve => {
        MongoClient.connect(
            process.env.MONGODB_URI,
            {
                useNewUrlParser: true
            },
            (err, db) => {
                if (err) throw err;
                db.db(
                    process.env.MONGODB_NAME ||
                        process.env.MONGODB_URI.split('/')[3]
                )
                    .collection('users')
                    .updateOne(
                        {
                            _id: senderId
                        },
                        {
                            $set: {
                                status: 1,
                                timestamp: timestamp
                            }
                        },
                        (err, obj) => {
                            if (err) throw err;
                            db.close(null, () => {
                                cache.put(senderId, 1);
                                resolve(obj);
                            });
                        }
                    );
            }
        );
    });
};
