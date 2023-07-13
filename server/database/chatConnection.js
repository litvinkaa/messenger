const {Chat} = require('../models/chatModel')
const db = require('./dbConfig');

class ChatConnection{

    

    async getById(id){
       
        const main_info = await Chat.findAll({
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

        return main_info[0];
       
  
    }

  
    

    async insert(chat){
        const answer = await Chat.create(chat)
            .then(function(item){
                return item;
            }).catch(function (err) {
                console.log(err);
                return {msg:"помилка при додавані чату"};
            });

        return answer;

    }


    async update(data){
        
        const main_info = await this.getById(data.chat.id);

        if(main_info){

            const answer = await Chat.update(data.chat, {where : {id : data.chat.id}}).then(function(item){
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

module.exports = ChatConnection