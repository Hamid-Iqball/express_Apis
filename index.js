const express  = require("express")
const  {connectMongooseDb} = require("./connection")
const {logReqRes} = require("./middlewares")


const userRouter = require("./routes/user")


const app = express()
const PORT = 8000

app.use(logReqRes("log.txt"))


// 1.mongoose connection
connectMongooseDb("mongodb://127.0.0.1:27017/project-express-1")







//Routes
app.use("/user", userRouter)



app.listen(PORT, ()=>console.log("Server has started port 8000"))