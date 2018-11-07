require('dotenv').config();

function EnableGettingStarted() {
    return new Promise(async resolve => {
        resolve(
            await require('axios').post(
                'http://api.chatbot.ngxson.com/graph/me/messenger_profile?access_token=' +
                    process.env.TOKEN_NUI,
                {
                    get_started: {
                        payload: 'GETTING_STARTED'
                    }
                }
            )
        );
    });
}

function EnablePersistent_menu() {
    return new Promise(async resolve => {
        resolve(
            await require('axios').post(
                'http://api.chatbot.ngxson.com/graph/me/messenger_profile?access_token=' +
                    process.env.TOKEN_NUI,
                {
                    persistent_menu: [
                        {
                            locale: 'default',
                            call_to_actions: [
                                {
                                    type: 'postback',
                                    title: 'Hướng dẫn sử dụng',
                                    payload: 'INSTRODUCTION'
                                },
                                {
                                    type: 'postback',
                                    title: 'Đổi sở thích',
                                    payload: 'CHANGE_FAVORITE'
                                }
                            ]
                        }
                    ]
                }
            )
        );
    });
}

(async () => {
    var gettingStarted = await EnableGettingStarted();
    console.log('Getting Started', gettingStarted.status === 200);
    var Persistent_menu = await EnablePersistent_menu();
    console.log('The Persistent Menu', gettingStarted.status === 200);
})();
