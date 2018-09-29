require('dotenv').config()

function EnableGettingStarted() {
    return new Promise(async (resolve) => {
        resolve(await (require('axios').post('http://api.chatbot.ngxson.com/graph/me/messenger_profile?access_token=' + process.env.TOKEN_NUI, {
            "get_started": {
                "payload": "GETTING_STARTED"
            }
        })))
    })
}

(async () => {
    var gettingStarted = await EnableGettingStarted()
    console.log(gettingStarted.status === 200)
})()