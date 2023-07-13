const Router = require('express')
const router = new Router()
const userController = require('../contollers/userController')

const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.register)
router.post('/login', userController.login)
router.get('/auth',authMiddleware, userController.check)
router.get('/search/:name_fragment',authMiddleware, userController.search)
router.put('/update',authMiddleware, userController.update)
router.get('/:id',authMiddleware, userController.getById)



module.exports =  router