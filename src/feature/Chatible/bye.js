import cache from 'memory-cache';
import mongodb from 'mongodb';
import { sendText } from '../../api/NuiAPI';

import { USER_CANCEL, USER1_PP, USER2_PP } from '../../variable/lang';

const MongoClient = mongodb.MongoClient;

export default (id1, id2 = null) => {
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
                .updateOne(
                    {
                        _id: id1
                    },
                    {
                        $set: {
                            status: 0,
                            timestamp: null,
                            idCouple: null
                        }
                    },
                    err => {
                        if (err) console.error(err);
                        if (!id2) {
                            return db.close(null, () => {
                                cache.put(id1, 0);
                                sendText(
                                    id1,
                                    process.env.USER_CANCEL || USER_CANCEL
                                );
                            });
                        }
                        db.db(
                            process.env.MONGODB_NAME ||
                                process.env.MONGODB_URI.split('/')[3]
                        )
                            .collection('users')
                            .updateOne(
                                {
                                    _id: id2
                                },
                                {
                                    $set: {
                                        status: 0,
                                        timestamp: null,
                                        idCouple: null
                                    }
                                },
                                err => {
                                    if (err) console.error(err);
                                    return db.close(null, () => {
                                        cache.put(id1, 0);
                                        cache.put(id2, 0);
                                        sendText(
                                            id1,
                                            process.env.USER1_PP || USER1_PP
                                        );
                                        sendText(
                                            id2,
                                            process.env.USER2_PP || USER2_PP
                                        );
                                    });
                                }
                            );
                    }
                );
        }
    );
};
