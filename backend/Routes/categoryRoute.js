const express = require('express')
const router = express.Router()
const {postCategory, categoryList, categoryDetails, updateCategory, deleteCategory} = require('../controllers/categoryController')


router.get('/',categoryList)
router.post('/',postCategory)
router.put('/',updateCategory)
router.delete('/',deleteCategory)
router.get('/')


module.exports = router