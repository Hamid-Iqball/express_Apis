const mogoose = require("mongoose")

async function connectMongooseDb(url){
    return mogoose.connect(url)
    .then(()=>console.log('MongoDB connected'))
    .catch(()=>console.log("Mongo Error"))
  
}

module.exports = {
    connectMongooseDb
}