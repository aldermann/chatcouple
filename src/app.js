import express from 'express';
import bodyParser from 'body-parser';

import webhook from './routes/webhook';
import chatfuel from './routes/chatfuel';

const app = express();
import dotenv from "dotenv"
dotenv.config();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.get('/ping', (_, res) => res.send('pong'));

app.use('/chatfuel', chatfuel);
app.use('/webhook', webhook);

function runServer(port = process.env.PORT || 3000, done) {
    app.listen(port, async err => {
        if (err) throw err;
        console.log(`Listening at port ${port}`);
        if (done) done();
    });
}

export default app;

export { runServer };
