import express from 'express';

import {
    processPostback,
    handleText
} from './bot'

const Router = express.Router();

Router.post('/', (req, res) => {
    console.time("Create User")
    for (let entry of req.body.entry) {
        for (let message of entry.messaging) {
            const senderId = message.sender.id;
            const timestamp = message.timestamp
            if (message.message) {
                if (message.message.text) {
                    // User gửi text
                    handleText(senderId, message.message.text, timestamp)
                } else if (message.message.attachments) {
                    //Send hình or vid or anything ?
                }
            } else if (message.postback) {
                // Bấm nút ?
                processPostback(senderId, message.postback.payload, timestamp);
            }
        }
    }
    res.sendStatus(200)
});


export default Router;