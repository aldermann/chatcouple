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
        .catch(err =>
            console.error('Error sending message: ', err)
        )
}

export function getUserData(senderId) {
    return new Promise(async (resolve) => {
        resolve((await (axios.get(`http://api.chatbot.ngxson.com/graph/${senderId}?access_token=${process.env.TOKEN_NUI}`))).data)
    })
}

export function sendButton(senderId, title, buttons) {
    axios.post(`http://api.chatbot.ngxson.com/graph/me/messages?access_token=${process.env.TOKEN_NUI}`, {
            messaging_type: "RESPONSE",
            recipient: {
                id: senderId
            },
            message: {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "button",
                        text: title,
                        buttons: buttons
                    }
                }
            }
        })
        .catch(err =>
            console.error('Error sending message: ', err)
        )
}

export function sendQuickReplies(senderId, title, buttons) {
    axios.post(`http://api.chatbot.ngxson.com/graph/me/messages?access_token=${process.env.TOKEN_NUI}`, {
            messaging_type: "RESPONSE",
            recipient: {
                id: senderId
            },
            message: {
                text: title,
                quick_replies: buttons
            }
        })
        .catch(err =>
            console.error('Error sending message: ', err)
        )
}

export function sendAttachment(senderId, type, payload) {
    axios.post(`http://api.chatbot.ngxson.com/graph/me/messages?access_token=${process.env.TOKEN_NUI}`, {
            messaging_type: "RESPONSE",
            recipient: {
                id: senderId
            },
            message: {
                attachment: {
                    type: type,
                    payload: {
                        url: payload,
                        is_reusable: true
                    }
                }
            }
        })
        .catch(err =>
            console.error('Error sending message: ', err)
        )
}