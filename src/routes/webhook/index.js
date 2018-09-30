import express from 'express';

import {
    processPostback,
    handleText
} from './bot'

import findUser from '../../feature/Chatible/findUser'
import Pair from '../../feature/Chatible/pair'

import cache from 'memory-cache'

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

Router.post('/pair', async (req, res) => {
    const result = await Promise.all([findUser(req.body.id1), findUser(req.body.id2)]);
    console.log(result);
    if ((result[0] === 0 || result[0] === 1) && (result[1] === 0 || result[1] === 1)) {
        Pair(req.body.id1, req.body.id2)
        return res.send("Ok");
    }
    return res.send("Something went wrong");
})

Router.get('/debug', (req, res) => {
    res.send(cache.keys())
})

export default Router;