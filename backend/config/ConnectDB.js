const mongoose = require('mongoose');
  const connectDB = async (url)=>{
     try {
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
        console.log("database  connected successfully");
     } catch (error) {
        console.log("MongoDB connection failed:", error.message);
     }
  }

  module.exports = connectDB;