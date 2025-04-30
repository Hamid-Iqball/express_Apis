const express  = require("express")
const  {connectMongooseDb} = require("./connection")
const {logReqRes} = require("./middlewares")
const userRouter = require("./routes/user")


const app = express()
const PORT = 8000


app.use(express.json())
app.use(logReqRes("log.txt"))



// 1.mongoose connection
connectMongooseDb("mongodb://127.0.0.1:27017/project-express-1").then(()=>console.log('MongoDB connected successfully'))
.catch(()=>console.log("Mongo Error"))







//Ro
app.use("/api/users", userRouter)



app.listen(PORT, ()=>console.log("Server has started port 8000"))