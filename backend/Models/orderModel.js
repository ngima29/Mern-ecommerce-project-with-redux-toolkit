const mongoose = require('mongoose')
const {ObjectId}=mongoose.Schema

const orderSchema = mongoose.Schema({
    ordetItems:[{
        type:ObjectId,
        required:true,
        ref:'OrderItem'
    }],
    shippingAddress1:{
        type :String,
        required:true
    },
    shippingAddress2:{
        type:String
    },
    city:{
        type:String,
        required:true
    },
    zip:{
        type :Number
    },
    country:{
        type :String,
        required:true
    },
    phone:{
        type :Number,
        required:true
    },
    status:{
        type :String,
        default:"pending",
        required:true 

    },
    totalPrice:{
        type :Number,
        required:true
    },
    user:{
        type:ObjectId,
        required:true,
        ref:'User'
    },
    dateOrdered:{
        type:Date,
        default:Date.now()
    }
})
const OrderModule = mongoose.model("Order", orderSchema);
module.exports = OrderModule;