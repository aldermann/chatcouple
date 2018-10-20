import mongodb from 'mongodb';
import {sendTemplatedMessage, sendText} from '../../api/NuiAPI';
import cache from 'memory-cache';
import {PAIR_SUCCESS, PAIR_SUCCESS_TITLE} from '../../variable/lang';
const MongoClient = mongodb.MongoClient;

export default (id1, id2) => {
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
                            _id: id1
                        },
                        {
                            $set: {
                                status: 2,
                                timestamp: null,
                                idCouple: id2
                            }
                        },
                        err => {
                            if (err) throw err;
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
                                            status: 2,
                                            timestamp: null,
                                            idCouple: id1
                                        }
                                    },
                                    err => {
                                        if (err) throw err;
                                        db.close(null, () => {
                                            cache.put(id1, id2);
                                            cache.put(id2, id1);
                                            sendTemplatedMessage(
                                                id1,
                                                process.env.PAIR_SUCCESS_TITLE ||
                                                PAIR_SUCCESS_TITLE,
                                                process.env.PAIR_SUCCESS ||
                                                    PAIR_SUCCESS
                                            );
                                            sendTemplatedMessage(
                                                id2,
                                                process.env.PAIR_SUCCESS_TITLE ||
                                                PAIR_SUCCESS_TITLE,
                                                process.env.PAIR_SUCCESS ||
                                                PAIR_SUCCESS
                                            );
                                            resolve(true);
                                        });
                                    }
                                );
                        }
                    );
            }
        );
    });
};
