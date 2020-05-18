const path = require('path');
const express = require('express'); 

let app = express();
let publicPath = path.join(__dirname,'../public')
app.use(express.static(publicPath))

let port = process.env.PORT || 3000;





console.log(publicPath);

app.listen(port,() => {
    console.log('node is listening in port 3000')
})