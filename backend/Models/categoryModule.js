const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, { timestamps: true })

 const categoryModel = mongoose.model('Category', categorySchema);
module.exports = categoryModel