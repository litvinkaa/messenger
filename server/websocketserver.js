const WebSocketServer = require('ws').Server;

const ChatConnection = require('./database/chatConnection');
const MessageConnection = require('./database/messageConnection');
const UserConnection = require('./database/userConnection');


let chatConnection = new ChatConnection();
let messageConnection = new MessageConnection();
let userConnection = new UserConnection();

class WsServer {
    constructor(server) {
        this.connections = [];
        this.wsServer = new WebSocketServer({ server: server });
        
        this.wsServer.on ('connection',  (connection) =>  {
            
        
            connection.on('close', () => this.removeConnection(connection));
            connection.on('message', async (message) => {
                // const dataStr = message.toString();
                const req_object = JSON.parse(message)
               
                const command = req_object[0]

                let chat_id = 0
                let counter = 0
                let chat = {}
              
                switch(command){
                    case "connect":
                        connection.user_id = parseInt(req_object[1])
                        this.addConnection(connection);
                        break
                    case "chat created":
                        chat_id = req_object[1]
                        
                        for (let conn of this.connections)
                        {
                            const user = await userConnection.getById(conn.user_id)
                            
                            if(user.active_chats.includes(chat_id))
                            {
                                
                                conn.send(JSON.stringify(["chat created"]))
                                counter ++
                                if(counter === 2)
                                {
                                    break
                                }
                            }
                            
                        }
                        break
                    case "chat deleted":
                        chat_id = req_object[1]
                        chat = await chatConnection.getById(parseInt(chat_id))

                        for (let conn of this.connections)
                        {
                            if((conn.user_id == chat.user1_id)||(conn.user_id == chat.user2_id)) 
                            {
                                conn.send(JSON.stringify(["chat deleted",chat_id]))
                                counter ++
                                if(counter === 2)
                                {
                                    break
                                }
                            }
                        }
                        break
                    case "message sent":
                        chat_id = req_object[1]
                        chat = await chatConnection.getById(parseInt(chat_id))

                        for (let conn of this.connections)
                        {
                            if((conn.user_id == chat.user1_id)||(conn.user_id == chat.user2_id)) 
                            {
                                conn.send(JSON.stringify(["message sent",chat_id]))
                                counter ++
                                if(counter === 2)
                                {
                                    break
                                }
                            }
                        }
                        break

                    case "user changed":
                        chat_id = req_object[1]
                        
                        for (let conn of this.connections)
                        {
                            const user = await userConnection.getById(conn.user_id)
                            
                            if(user.active_chats.includes(chat_id))
                            {
                                
                                conn.send(JSON.stringify(["user changed"], chat_id))
                                counter ++
                                if(counter === 2)
                                {
                                    break
                                }
                            }
                            
                        }
                        break
                }

                

                // this.notifyAll(dataStr, connection);
                
            });
 
        });
       
    }
 
    addConnection(connection) { this.connections.push(connection); }
    removeConnection(connection) { this.connections = this.connections.filter(x => x !== connection); }
 
    // notifyAll(text, conn) {
        
    //     for (const connection of this.connections) { 
    //        if(connection !== conn)
    //        {
    //            connection.send(text); 

    //        }
    //     }
    // }
 };
 
 module.exports = WsServer;