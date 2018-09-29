import express from 'express'
import bodyParser from 'body-parser'

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/ping', (_, res) => res.send("pong"))

function runServer(port = process.env.PORT || 3000, done) {
    app.listen(port, async err => {
        if (err) throw err;
        console.log(`Listening at port ${port}`);
        if (done) done();
    });
}

export default app;

export {
    runServer
};