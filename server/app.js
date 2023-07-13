require('dotenv').config()
const express = require('express')
const cors = require("cors");
const http = require('http');

const PORT = process.env.PORT || 5000

const dotenv = require('dotenv');
dotenv.config();
  
const app = express()

app.use(
   express.urlencoded({
     extended: true
   })
 )
 

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(express.json())


const indexRouter = require('./routers/indexRouter')

const server = http.createServer(app);
const WsServer = require('./websocketserver');
const wsServer = new WsServer(server);

app.use('/api',indexRouter)


app.use(function(req, res) {  console.log('Any request');});

server.listen(PORT, () => console.log('Server is ready'));



