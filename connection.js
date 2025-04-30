const mogoose = require("mongoose")

async function connectMongooseDb(url){
    return mogoose.connect(url)
  
  
}

module.exports = {
    connectMongooseDb
}