const express = require('express')
const router = express.Router()
const {userRegister, verifiedEmail, login}  = require('../controllers/userController')


router.post('/',userRegister)
router.get('/verifyemail', verifiedEmail)
router.post('/login', login)


module.exports = router