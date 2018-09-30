import {
    sendText,
    sendButton
} from '../../api/NuiAPI'

import InsertUser from '../../feature/Chatible/newUser'
import findUser from '../../feature/Chatible/findUser'
import userSendRequest from '../../feature/Chatible/userSendRequest'
import findPair from '../../feature/Chatible/findPair'
import bye from '../../feature/Chatible/bye'
import changeFavorite from '../../feature/Chatible/changeFavorite';

import {
    WELCOME_TEXT,
    INSTRODUCTION,
    REQUEST_MSG,
    CHANGE_GENDER
} from '../../variable/lang'

import button from '../../util/button'

export async function processPostback(senderId, payload, timestamp) {
    switch (payload) {
        case "GETTING_STARTED":
            return InsertUser(senderId, timestamp).then(() => {
                sendText(senderId, process.env.WELCOME_TEXT || WELCOME_TEXT)
            })
        case "INSTRODUCTION":
            return sendText(senderId, process.env.INSTRODUCTION || INSTRODUCTION)
        case "CHANGE_FAVORITE":
            return sendButton(senderId, process.env.CHANGE_GENDER || CHANGE_GENDER, [button("postback", "CHANGE_MALE", "Nam"), button("postback", "CHANGE_FEMALE", "Nữ"), button("postback", "CHANGE_ANY", "Ai cũng được :>")])
        case "CHANGE_MALE":
            return changeFavorite(senderId, "male")
        case "CHANGE_FEMALE":
            return changeFavorite(senderId, "female")
        case "CHANGE_ANY":
            return changeFavorite(senderId, "any")
    }
}

export async function handleText(senderId, message, timestamp) {
    const status = await findUser(senderId, timestamp)
    if (status === 0) {
        await userSendRequest(senderId, timestamp)
        findPair()
        return sendText(senderId, process.env.REQUEST_MSG || REQUEST_MSG)
    }
    processText(senderId, status, message)
}

function processText(senderId, status, message) {
    switch (message) {
        case "pp":
            {
                if (status === 1) return bye(senderId)
                return bye(senderId, status)
            }
        default:
            return sendText(status, message)
    }
}