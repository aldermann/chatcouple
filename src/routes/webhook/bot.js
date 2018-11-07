import {
    sendText,
    sendTemplatedMessage,
    sendQuickReplies,
    sendAttachment
} from "../../api/NuiAPI";

import InsertUser from "../../feature/Chatible/newUser";
import findUser from "../../feature/Chatible/findUser";
import userSendRequest from "../../feature/Chatible/userSendRequest";
import findPair from "../../feature/Chatible/findPair";
import bye from "../../feature/Chatible/bye";
import changeFavorite from "../../feature/Chatible/changeFavorite";

import {
    WELCOME_TEXT,
    WELCOME_TEXT_TITLE,
    INSTRODUCTION,
    REQUEST_MSG,
    REQUESTED_MSG,
    CHANGE_GENDER,
    INTRODUCTION_TITLE, REQUEST_MSG_TITLE
} from "../../variable/lang";

import quickReplies from "../../util/quickreplies";
export async function processPostback(senderId, payload, timestamp) {
    switch (payload) {
        case "GETTING_STARTED":
            return InsertUser(senderId, timestamp).then(() => {
                sendTemplatedMessage(
                    senderId,
                    process.env.WELCOME_TEXT_TITLE || WELCOME_TEXT_TITLE,
                    process.env.WELCOME_TEXT || WELCOME_TEXT
                );
            });
        case "INSTRODUCTION":
            return sendTemplatedMessage(
                senderId,
                process.env.INTRODUCTION_TITLE || INTRODUCTION_TITLE,
                process.env.INSTRODUCTION || INSTRODUCTION
            );
        case "CHANGE_FAVORITE":
            return sendQuickReplies(
                senderId,
                process.env.CHANGE_GENDER || CHANGE_GENDER,
                [
                    quickReplies(
                        "text",
                        "Nam",
                        "https://xn--i-7iq.ws/emoji-image/%F0%9F%91%A6.png?format=ios",
                        "CHANGE_MALE"
                    ),
                    quickReplies(
                        "text",
                        "Nữ",
                        "https://xn--i-7iq.ws/emoji-image/%F0%9F%91%A7.png?format=ios",
                        "CHANGE_FEMALE"
                    ),
                    quickReplies(
                        "text",
                        "Anyone",
                        "https://xn--i-7iq.ws/emoji-image/%F0%9F%91%AB.png?format=ios",
                        "CHANGE_ANY"
                    )
                ]
            );
        case "CHANGE_MALE":
            return changeFavorite(senderId, "male");
        case "CHANGE_FEMALE":
            return changeFavorite(senderId, "female");
        case "CHANGE_ANY":
            return changeFavorite(senderId, "any");
    }
}

export async function handleText(senderId, message, timestamp, type = null) {
    if (message === "#id") return sendText(senderId, senderId.toString());
    const status = await findUser(senderId, timestamp);
    if (status === 0) {
        await userSendRequest(senderId, timestamp);
        findPair();
        return sendTemplatedMessage(
            senderId,
            process.env.REQUEST_MSG_TITLE || REQUEST_MSG_TITLE,
            process.env.REQUEST_MSG || REQUEST_MSG
        );
    }
    processText(senderId, status, message, type);
}

function processText(senderId, status, message, type = null) {
    switch (message.toLowerCase()) {
        case "pp": {
            if (status === 1) return bye(senderId);
            return bye(senderId, status);
        }
        default:
            if (status === 1)
                return sendTemplatedMessage(
                    senderId,
                    process.env.REQUESTED_MSG_TITLE || REQUESTED_MSG_TITLE,
                    process.env.REQUESTED_MSG || REQUESTED_MSG
                );
            if (type) return sendAttachment(status, type, message);
            return sendText(status, message);
    }
}
