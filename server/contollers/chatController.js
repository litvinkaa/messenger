const ChatConnection = require('../database/chatConnection');
const MessageConnection = require('../database/messageConnection');


let chatConnection = new ChatConnection();
let messageConnection = new MessageConnection();
module.exports = {

   
    async create(req,res)
    {
        let answer = {}
        try
        {

        
            const{user1_id, user2_id} = req.body;
            answer = await chatConnection.insert(
                {
                
                    user1_id: user1_id,
                    user2_id: user2_id
                }
            );
            res.status(200).json(answer); 
        }
        
        catch(err)
        {
                console.log(err)
                answer.message = "Bad request";
                res.status(400);
                res.json(answer);
                
        }
    },

 

    async update(req,res)
    {
        let answer = {}
        try
        {

            
            answer = await chatConnection.update(req.body);
            res.status(200).json(answer); 
        }
        
        catch(err)
        {
                console.log(err)
                answer.message = "Bad request";
                res.status(400);
                res.json(answer);
                
        }
    },
    async getById(req,res)
    {
        let answer = {}
        try
        {

        
        answer = await chatConnection.getById(req.params.id);
        
        res.status(200).json(answer); 
        }
        
        catch(err)
        {
                console.log(err)
                answer.message = "Bad request";
                res.status(400);
                res.json(answer);
                
        }
    },

    async getMessages(req,res)
    {
        let answer = {}
        try
        {

        
            let messages = []
            messages = await messageConnection.getByChat(req.params.id);
            res.status(200).json(messages); 
        }
        
        catch(err)
        {
                console.log(err)
                answer.message = "Bad request";
                res.status(400);
                res.json(answer);
                
        }
    }
    
}