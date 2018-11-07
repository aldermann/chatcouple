import cache from 'memory-cache';
import mongodb from 'mongodb';
import { getUserData } from '../../api/NuiAPI';

const MongoClient = mongodb.MongoClient;

export default (senderId, timestamp = null) => {
    return new Promise(resolve => {
        if (!cache.get(senderId)) {
            MongoClient.connect(
                process.env.MONGODB_URI,
                {
                    useNewUrlParser: true
                },
                (err, db) => {
                    if (err) console.error(err);
                    db.db(
                        process.env.MONGODB_NAME ||
                            process.env.MONGODB_URI.split('/')[3]
                    )
                        .collection('users')
                        .findOne(
                            {
                                _id: senderId
                            },
                            async (err, res) => {
                                if (err) console.error(err);
                                if (!res) {
                                    db.db(
                                        process.env.MONGODB_NAME ||
                                            process.env.MONGODB_URI.split(
                                                '/'
                                            )[3]
                                    )
                                        .collection('users')
                                        .insertOne(
                                            Object.assign(
                                                {},
                                                await getUserData(senderId),
                                                {
                                                    status: 0,
                                                    timestamp: null,
                                                    favorite: 'any',
                                                    createAt: timestamp,
                                                    _id: senderId,
                                                    idCouple: null
                                                }
                                            ),
                                            err => {
                                                if (err) console.error(err);
                                                cache.put(senderId, 0);
                                                db.close(null, () =>
                                                    resolve(0)
                                                );
                                            }
                                        );
                                } else {
                                    if (res.idCouple) {
                                        cache.put(senderId, res.idCouple);
                                        db.close(null, () =>
                                            resolve(res.idCouple)
                                        );
                                    } else {
                                        cache.put(senderId, res.status);
                                        db.close(null, () =>
                                            resolve(res.status)
                                        );
                                    }
                                }
                            }
                        );
                }
            );
        } else resolve(cache.get(senderId));
    });
};
