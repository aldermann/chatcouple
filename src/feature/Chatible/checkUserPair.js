import cache from 'memory-cache';
import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;

export default senderId => {
    return new Promise(resolve => {
        if (!cache.get(senderId)) {
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
                        .findOne(
                            {
                                _id: senderId
                            },
                            (err, res) => {
                                if (err) console.error(err);
                                if (res) {
                                    if (res.status != 3) {
                                        cache.put(senderId, res.status);
                                        resolve(true);
                                    }
                                    cache.put(senderId, res.idCouple);
                                    resolve(false);
                                }
                            }
                        );
                }
            );
        } else {
            if (cache.get(senderId) === 0 || cache.get(senderId) === 1)
                resolve(true);
            resolve(false);
        }
    });
};
