const mongoose = require("mongoose")

const connectingDB = mongoose.connect(`${process.env.CONNECTIONCLOUD}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(con=>{
    console.log("Connected to DB")
}).catch(err=>{
    console.log(err)
})


module.exports = connectingDB;


