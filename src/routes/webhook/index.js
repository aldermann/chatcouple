import express from 'express';

import {
    processPostback,
    handleText
} from './bot'

const Router = express.Router();

Router.post('/', (req, res) => {
    for (let entry of req.body.entry) {
        for (let message of entry.messaging) {
            const senderId = message.sender.id;
            const timestamp = message.timestamp
            if (message.postback) {
                processPostback(senderId, message.postback.payload, timestamp);
            } else if (message.message) {
                if (message.message.quick_reply) {
                    // Handle quick replies
                    processPostback(senderId, message.message.quick_reply.payload, timestamp);
                } else if (message.message.text) {
                    // User gửi text
                    handleText(senderId, message.message.text, timestamp)
                } else if (message.message.attachments) {
                    //Send hình or vid or anything ?
                }
            }
        }
    }
    res.sendStatus(200)
});


export default Router;