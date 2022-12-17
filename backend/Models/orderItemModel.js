const mongoose = require('mongoose')
const {ObjectId}= mongoose.Schema

const orderItemSchema = new mongoose.Schema({
    quantity:{
        type:Number,
        required:true
    },
    product:{
        type:ObjectId,
        required:true,
        ref:'Product'
    }
},{timestamps:true})
const orderItem = mongoose.model('orderItem',orderItemSchema)
module.exports= orderItem