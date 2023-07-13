const jwt = require('jsonwebtoken');
const { contains } = require('sequelize/dist/lib/operators');

module.exports = function (req,res,next)
{
    try
    {
        const token = req.headers.authorization.split(' ')[1];
        if(!token)
        {
            return res.status(401).json({message: "Not authorised"});
        }
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
       
        req.user = decoded;
        next();
    }
    catch (e)
    {
        return res.status(401).json({message: "Not authorised"});
    }
};