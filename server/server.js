const path = require('path');
const express = require('express'); 
const http = require('http');
const socketIO = require('socket.io');




let app = express();
let publicPath = path.join(__dirname,'../public')
app.use(express.static(publicPath))
let port = process.env.PORT || 3000;
let server = http.createServer(app)
let io = socketIO(server);


io.on('connection',(socket) => {
    console.log('User connected!')
    socket.on("createMessage",(message) => {
        console.log(message)
        io.emit("newMessage",{
            from :message.from,
            text : message.text,
            createdAt : new Date().getTime()});
    })
    socket.on('disconnect',() => {
        console.log('User disconnected!');
    })
});
console.log(publicPath);

server.listen(port,() => {
    console.log('node is listening in port 3000')
})