const path = require('path');
const express = require('express'); 
const translate = require('translate');
const http = require('http');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message')




let app = express();
let publicPath = path.join(__dirname,'../public')
app.use(express.static(publicPath))
const CLIENTTOKEN = '88ca76ea5cb84d57949c95869eae794e';
const sessionID = 'vsyvyscvibcsuyvs'
let port = process.env.PORT || 3000;
let server = http.createServer(app)
let io = socketIO(server);
app.use(bodyParser.json())
const apiai = require('apiai')(CLIENTTOKEN);

io.on('connection',(socket) => {
    console.log('User connected!')

    //emit message when new user joins
    socket.emit("newMessage",generateMessage("Bot","Hello there,I can do small talk and help with translations to french when you say to translate"));

    // socket.broadcast.emit("newMessage",generateMessage("Admin","New User joined"));
    //on current location message 
    // socket.on("createLocationMessage",(coords)=> {
    //     io.emit("newLocationMessage",generateLocationMessage("Admin",coords.longitude,coords.latitude));
    // })

    //on create message listener
    socket.on("createMessage",(message,callback) => {
        console.log(message)
        // socket.broadcast.emit("newMessage",generateMessage(message.from,message.text));
        // use dialog flow here
        callback()
        let apiaiReq = apiai.textRequest(message.text,{
            sessionId : sessionID
        })

        apiaiReq.on('response', (response) => {
            console.log(response);
            let aiText = response.result.fulfillment.speech;
            socket.emit('newMessage', generateMessage('Bot',aiText)); // Send the result back to the browser!
          });
      
          apiaiReq.on('error', (error) => {
            console.log(error);
          });
      
          apiaiReq.end();
      

    });

    socket.on('disconnect',() => {
        console.log('User disconnected!');
        // socket.broadcast.emit("newMessage",generateMessage("Admin","User left!"));
    })


});
console.log(publicPath);


app.post('/translate',(req,res) => {
    console.log(req)
    const textToTranslate = req.body.queryResult.parameters.text

    if(!textToTranslate){
        res.json({
            fulfillmentText : "Hmmm... Go again",
            success: false
        })
    }
            translate(textToTranslate,{to:'fr',engine: 'yandex',key : 'trnsl.1.1.20200422T011944Z.402eead6367ae0e3.5ff9403fee039ed790408396ba154b2d3103ca97' })
            .then((text)=> {
                res.json({
                    fulfillmentText : `${text}`
                })
            }).catch((err) => {
                console.log("an error occured while translating:" + err)
                res.json({
                    fulfillmentText : "something went wrong",
                    success: false
                })
            })
})


server.listen(port,() => {
    console.log('node is listening in port 3000')
})