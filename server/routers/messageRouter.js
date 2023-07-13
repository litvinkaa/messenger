const Router = require('express')
const router = new Router()
const messageController = require('../contollers/messageController')

const authMiddleware = require('../middleware/authMiddleware')

router.get('/:id',authMiddleware, messageController.getById)
router.put('/update',authMiddleware,authMiddleware, messageController.update)
router.post('/send',authMiddleware, messageController.create)




module.exports =  router