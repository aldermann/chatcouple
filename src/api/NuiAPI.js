import axios from 'axios';

export function sendText(senderId, msg) {
    axios.post(`http://api.chatbot.ngxson.com/graph/me/messages?access_token=${process.env.TOKEN_NUI}`, {
        messaging_type: "RESPONSE",
        recipient: {
            id: senderId
        },
        message: {
            text: msg
        }
    })
    // .then(console.timeEnd("Test"))
    .catch(err =>
        console.error('Error sending message: ', err)
    )
}

export function getUserData(senderId) {
    return new Promise(async (resolve) => {
        resolve((await (axios.get(`http://api.chatbot.ngxson.com/graph/${senderId}?access_token=${process.env.TOKEN_NUI}`))).data)
    })
}