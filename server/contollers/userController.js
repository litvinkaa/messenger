const UserConnection = require('../database/userConnection');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let userConnection = new UserConnection();

const generateJwt = (id, username) => {
    return jwt.sign(
        {id,username},
        process.env.TOKEN_SECRET,
        {expiresIn: '2h'}
        
        );

}

module.exports = {

    async register(req,res)
    {
        let answer = {};
        try
        {

            
            const{username, password} = req.body;
            

            

            const candidate = await userConnection.getByUsername(username);
            
            if(candidate.msg !== "не знайдено")
            {
                answer.message = "User with this username already exists";
                res.status(400);
                return res.json(answer);
                
                
            }
            const password_hashed = await bcrypt.hash(password, 5);
            const user = await userConnection.insert(
                {
                    username: username,
                    password_hashed: password_hashed
                }
            );
            

            const token = generateJwt(user.id, username);
            return res.json({token});
        }
        catch(err)
        {
                console.log(err)
                answer.message = "Bad request";
                res.status(400);
                res.json(answer);
                
        }

    },
    async login(req,res)
    {
        let answer = {};

        try
        {

            
            const{username, password} = req.body;
            
            const user = await userConnection.getByUsername(username);
            
            if(user.msg === "не знайдено")
            {
               
                answer.message = "User with this username does not exists";
                res.status(404);
                return res.json(answer);
                
            }
            const is_pass_correct = await bcrypt.compareSync(password, user.password_hashed );
            if(!is_pass_correct)
            {
                
                answer.message = "Incorrect password";
                res.status(400);
                return res.json(answer);
            }
            

            const token = generateJwt(user.id, username);
            return res.json({token});
        }
        catch(err)
        {
                console.log(err)
                answer.message = "Bad request";
                res.status(400);
                res.json(answer);
                
        }

    },
    

    async check(req,res)
    {
        let answer ={};
        try
        {
            const token = generateJwt(req.user.id,req.user.username) 
            return res.json({token})
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
        let answer ={};
        try
        {
            
            answer = await userConnection.update(req.body);
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
        let answer ={};
        try
        {
            answer = await userConnection.getById(req.params.id);
            
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
    
    async search(req,res)
    {
        let answer ={};
        try
        {

            
            answer = await userConnection.search(req.params.name_fragment);
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