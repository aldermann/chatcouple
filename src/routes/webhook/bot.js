import {
    sendText,
} from '../../api/NuiAPI'

import InsertUser from '../../feature/Chatible/newUser'
import findUser from '../../feature/Chatible/findUser'
import userSendRequest from '../../feature/Chatible/userSendRequest'
import findPair from '../../feature/Chatible/findPair'

export async function processPostback(senderId, payload, timestamp) {
    switch (payload) {
        case "GETTING_STARTED":
            {
                InsertUser(senderId, timestamp).then(() => {
                    sendText(senderId, process.env.WELCOME_TEXT)
                })
            }
    }
}

export async function handleText(senderId, message, timestamp) {
    const status = await findUser(senderId, timestamp)
    if (status === 0) {
        await userSendRequest(senderId, timestamp)
        findPair()
        sendText(senderId, process.env.REQUEST_MSG)
    } else if (status === 1) {
        sendText(senderId, process.env.REQUESTED_MSG)
    } else {
        sendText(status, message)
    }
}