const Router = require('express')
const router = new Router()
const chatController = require('../contollers/chatController')

const authMiddleware = require('../middleware/authMiddleware')

router.get('/:id', authMiddleware,chatController.getById)
router.get('/messages/:id',authMiddleware, chatController.getMessages)
router.put('/update',authMiddleware,chatController.update)
router.post('/create',authMiddleware,chatController.create)




module.exports =  router