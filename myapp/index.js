const express = require('express')
const app = express()
const server = require('http').createServer(app);
app.use(express.static('public'));
const port = 3000
var io = require('socket.io')(server);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)

})

io.on('connection', function(socket) {
    console.log('Client connected to the WebSocket');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('chat message', function(msg) {
        console.log("Received a chat message");
        io.emit('chat message', msg);
    });
})