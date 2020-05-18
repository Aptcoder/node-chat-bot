console.log("I work")
let socket = io();

socket.on('connect' ,() => {
    console.log('Connected to server');

})

socket.on('disconnect',() => {
    console.log('Disconnected from Server')
})

socket.on("newMessage",function(email){
    console.log(email)
})

