import mongodb from 'mongodb'
import checkUserPair from './checkUserPair';
import pair from './pair';

const MongoClient = mongodb.MongoClient;

export default () => {
    MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true
    }, (err, db) => {
        if (err) throw err;
        db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split("/")[3]).collection('users').find({
            status: 1
        }).toArray(async (err, obj) => {
            if (err) throw err;
            if (obj.length > 1) {
                for (let i = 0; i < obj.length; ++i) {
                    const user2 = await findUser2(obj[i]._id, obj[i].favorite, obj[i].gender)
                    const arrCheck = await Promise.all([checkUserPair(obj[i]._id), checkUserPair(user2)])
                    if (arrCheck[0] && arrCheck[1]) return pair(obj[i]._id, user2)
                }
            }
        })
    })
}

function findUser2(senderId, senderFav, senderGen) {
    return new Promise(resolve => {
        MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true
        }, (err, db) => {
            if (err) throw err;
            if (senderFav === 'any') {
                db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split("/")[3]).collection('users').find({
                    $or: [{
                        favorite: senderGen
                    }, {
                        favorite: "any"
                    }],
                    status: 1,
                    _id: {
                        $ne: senderId
                    }
                }).toArray((err, obj) => {
                    if (err) throw err;
                    if (obj.length === 0) return null
                    else {
                        return resolve(obj[0]._id);
                    }
                })
            } else {
                db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split("/")[3]).collection('users').find({
                    $or: [{
                        favorite: senderGen
                    }, {
                        favorite: "any"
                    }],
                    gender: senderFav,
                    status: 1,
                    _id: {
                        $ne: senderId
                    }
                }).toArray((err, obj) => {
                    if (err) throw err;
                    if (obj.length === 0) return null
                    else {
                        return resolve(obj[0]._id)
                    }
                })
            }
        })
    })
}