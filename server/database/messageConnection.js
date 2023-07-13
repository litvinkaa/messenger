const {Message} = require('../models/messageModel')
const db = require('./dbConfig');

class MessageConnection{

    

    async getById(id){
        let answer = {};
        const main_info = await Message.findAll({
                where: {
                   id : id
                }
            }).then(function(item){
                return item;
            }).catch(function (err) {
                return err;
            });

        if(main_info.length === 0){
            return {msg: "не знайдено"}
        }

        answer = main_info[0];
  
        return answer;
    }

    async getByChat(chat_id){
        let answer = [];
        const main_info = await Message.findAll({
                where: {
                   chat_id : chat_id
                },
                order: [
                    ['createdAt', 'ASC']
                    
                ],
            }).then(function(item){
                return item;
            }).catch(function (err) {
                return err;
            });

        
        
        answer = main_info;
  
        return answer;
    }

  
    

    async insert(chat){
        const answer = await Message.create(chat)
            .then(function(item){
                return item;
            }).catch(function (err) {
                console.log(err);
                return {msg:"помилка при додавані повідомлення"};
            });

        return answer;

    }


    async update(data){
        
        const main_info = await this.getById(data.message.id);

        if(main_info){

            const answer = await  Message.update(data.message, {where : {id : data.message.id}}).then(function(item){
                return item;
            }).catch(function (err) {
                return err;
            });

            return answer
        }else{
            return {msg: "не знайдено"}
        }
    }


    
}

module.exports =  MessageConnection