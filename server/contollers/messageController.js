const MessageConnection = require('../database/messageConnection');


let messageConnection = new MessageConnection();

module.exports = {

   
    async create(req,res)
    {
        let answer = {}
        try
        {

        
            const{text, chat_id,sender_id} = req.body.message;
            answer = await messageConnection.insert(
                {
                
                    chat_id: chat_id,
                    sender_id:sender_id,
                    text: text,
                    is_edited: false
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

            
            answer = await messageConnection.update(req.body);
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

        
            answer = await messageConnection.getById(req.params.id);
            res.status(200).json(answer); 
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