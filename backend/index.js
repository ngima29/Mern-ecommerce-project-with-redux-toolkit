require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./config/ConnectDB')

const url = process.env.DB_URL;
const port= process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



connectDB(url);


app.listen(port, ()=>{
    console.log(`server is running at port ${port}`);
})