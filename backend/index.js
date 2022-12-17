require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./config/ConnectDB')
const userRoute = require('./Routes/userRoute')
const categoryRoute = require('./Routes/categoryRoute')
const productRoute = require('./Routes/productRoute')
const orderRoute = require('./Routes/orderRoute')
const url = process.env.DB_URL;
const port= process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes
app.use('/user',userRoute)
app.use('/category',categoryRoute)
app.use('/product',productRoute)
app.use('/order',orderRoute)

connectDB(url);


app.listen(port, ()=>{
    console.log(`server is running at port ${port}`);
})