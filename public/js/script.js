console.log("I work")
let socket = io();

socket.on('connect' ,() => {
    console.log('Connected to server');

})

socket.on('disconnect',() => {
    console.log('Disconnected from Server')
})

socket.on("newMessage",function(message){
    console.log(message)
    let li = `<li>${message.from} : ${message.text}</li>`
    $('#messages').append(li);
});

socket.emit("createMessage",{
    from : "the milz",
    text : "this is all stupid"
},function(){
    console.log("Got It")
})

$('#message-form').on('submit',function(e){
    e.preventDefault();


    let input = $("input[name='message'").val();
    socket.emit("createMessage",{
        from : "User",
        text : input
    },function(){
        console.log("Got It")
    })
})