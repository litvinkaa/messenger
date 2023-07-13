const {User} = require('../models/userModel')
const db = require('./dbConfig');

class UserConnection{

    

    async getById(id){
        let answer = {};
        const main_info = await User.findAll({
                where: {
                   id : id
                }
            }).then(function(item){
                return item;
            }).catch(function (err) {
                return err;
            });

        if(main_info.length === 0){
            return {message: "Not found"}
        }

        answer = main_info[0];
  
        return answer;
    }

    async getByUsername(username){
        let answer = {};
        const main_info = await User.findAll({
                where: {
                    username : username
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

    

    async insert(user){
        const answer = await User.create(user)
            .then(function(item){
                return item;
            }).catch(function (err) {
                console.log(err);
                return {msg:"помилка при додавані користувача"};
            });

        return answer;

    }


    async update(data){
        
        const main_info = await this.getById(data.user.id);
        

        if(main_info){

            const answer = await User.update(data.user, {where : {id : data.user.id}/*, returning: true*/}).then(function(item){
                
                return item;
            }).catch(function (err) {
                return err;
            });

            
            return answer
        }else{
            return {msg: "не знайдено"}
        }
    }


    async search(name_fragment){
        try{
            let query = `SELECT * FROM "Users" WHERE username ~* $$${name_fragment}$$`;

            
            
            const assosiations = await db.query(query)
            return assosiations.rows;
            
        }catch(err){
            console.log(err)
            return {error:"Input error",message:err};
        }
        
    }
}

module.exports = UserConnection