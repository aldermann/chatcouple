import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;
import { sendTemplatedMessage} from "../../api/NuiAPI";
import {
    GENDER_CHANGE_SUCCESS,
    GENDER_CHANGE_SUCCESS_TITLE
} from "../../variable/lang";
export default (senderId, favorite) => {
    MongoClient.connect(
        process.env.MONGODB_URI,
        {
            useNewUrlParser: true
        },
        (err, db) => {
            if (err) throw err;
            db.db(
                process.env.MONGODB_NAME ||
                    process.env.MONGODB_URI.split("/")[3]
            )
                .collection("users")
                .updateOne(
                    {
                        _id: senderId
                    },
                    {
                        $set: {
                            favorite: favorite
                        }
                    },
                    err => {
                        if (err) console.log(error);
                        db.close(null, () => {
                            return sendTemplatedMessage(
                                senderId,
                                process.env.GENDER_CHANGE_SUCESS_TITLE ||
                                    GENDER_CHANGE_SUCCESS_TITLE,
                                process.env.GENDER_CHANGE_SUCCESS ||
                                    GENDER_CHANGE_SUCCESS
                            );
                        });
                    }
                );
        }
    );
};
