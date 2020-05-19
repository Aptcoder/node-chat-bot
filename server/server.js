const path = require('path');
const express = require('express'); 
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message')




let app = express();
let publicPath = path.join(__dirname,'../public')
app.use(express.static(publicPath))
let port = process.env.PORT || 3000;
let server = http.createServer(app)
let io = socketIO(server);


io.on('connection',(socket) => {
    console.log('User connected!')

    //emit message when new user joins
    socket.emit("newMessage",generateMessage("Admin","Welcome to the chat"));

    socket.broadcast.emit("newMessage",generateMessage("Admin","New User joined"));
    //on current location message 
    socket.on("createLocationMessage",(coords)=> {
        io.emit("newLocationMessage",generateLocationMessage("Admin",coords.longitude,coords.latitude));
    })

    //on create message listener
    socket.on("createMessage",(message,callback) => {
        console.log(message)
        io.emit("newMessage",generateMessage(message.from,message.text));
        callback()
    });

    socket.on('disconnect',() => {
        console.log('User disconnected!');
        socket.broadcast.emit("newMessage",generateMessage("Admin","User left!"));
    })


});
console.log(publicPath);

server.listen(port,() => {
    console.log('node is listening in port 3000')
})