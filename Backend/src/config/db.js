const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.DB_NAME
})
.then(()=>{
    console.log("Connected to Database");
})
.catch(err=>{
    console.log("Failed to connect to Database ", err.message);
})